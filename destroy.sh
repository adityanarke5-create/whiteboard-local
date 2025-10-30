#!/bin/bash
set -euo pipefail

# destroy.sh
# Automated cleanup script for AWS resources created by the whiteboard project.
#
# WARNING: destructive. This will delete resources (EB envs, EB apps, Amplify apps,
#          RDS instances, S3 buckets, EIPs, security groups, CloudFormation stacks).
#          Use --dry-run to preview actions. Use --yes to skip confirmations.
#
# Usage:
#   ./destroy.sh            # interactive (recommended)
#   ./destroy.sh --yes      # run with no prompts (dangerous)
#   ./destroy.sh --dry-run  # only show what WOULD be deleted
#   ./destroy.sh --yes --snapshot-db  # delete with final RDS snapshot
#
# IMPORTANT: Edit the DEFAULT_* variables below to match your resource names if needed.

REGION="${AWS_REGION:-ap-south-1}"
YES=false
DRY_RUN=false
SNAPSHOT_DB=false

# Default resources to target — change if your names are different
DEFAULT_EB_APPS=("Collaborativ-WhiteBoard" "whiteboard-be" "Collaborativ-WhiteBoard-backend" "Collaborativ-WhiteBoard-frontend")
DEFAULT_EB_ENVS=("whiteboard-backend-env" "whiteboard-frontend-env" "whiteboard-backend" "whiteboard-frontend")
# Amplify apps (IDs or names). If left empty, script will list and ask before deleting discovered ones.
DEFAULT_AMPLIFY_APPS=()
# RDS instances (identifiers)
DEFAULT_RDS_INSTANCES=("whiteboarddb")
# S3 buckets (explicit names to remove; script will also attempt to remove EB-created buckets in the region)
DEFAULT_S3_BUCKETS=()
# CloudFormation stacks to delete (e.g., Amplify stacks)
DEFAULT_CF_STACKS=()
# Elastic IPs to release (allocation ids)
DEFAULT_EIPS=()

# allow override via environment variable or args
EB_APPS=("${DEFAULT_EB_APPS[@]}")
EB_ENVS=("${DEFAULT_EB_ENVS[@]}")
AMPLIFY_APPS=("${DEFAULT_AMPLIFY_APPS[@]}")
RDS_INSTANCES=("${DEFAULT_RDS_INSTANCES[@]}")
S3_BUCKETS=("${DEFAULT_S3_BUCKETS[@]}")
CF_STACKS=("${DEFAULT_CF_STACKS[@]}")
EIPS=("${DEFAULT_EIPS[@]}")

# parse flags
while [[ $# -gt 0 ]]; do
  case "$1" in
    --yes|-y) YES=true; shift ;;
    --dry-run) DRY_RUN=true; shift ;;
    --snapshot-db) SNAPSHOT_DB=true; shift ;;
    --region) REGION="$2"; shift 2 ;;
    --help|-h) echo "Usage: $0 [--yes] [--dry-run] [--snapshot-db] [--region REGION]"; exit 0 ;;
    *) echo "Unknown arg: $1"; echo "Use --help"; exit 1 ;;
  esac
done

echo "Region: $REGION"
if $DRY_RUN; then
  echo "Mode: DRY RUN (no deletions will be performed)"
fi
echo

# quick AWS creds check
if ! aws sts get-caller-identity --region "$REGION" > /dev/null 2>&1; then
  echo "❌ AWS credentials not configured or invalid. Run 'aws configure' or set AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY."
  exit 1
fi

confirm_prompt() {
  # $1 = message
  if $YES ; then
    return 0
  fi
  read -r -p "$1 (type DELETE to confirm): " ans
  if [[ "$ans" != "DELETE" ]]; then
    echo "Skipping."
    return 1
  fi
  return 0
}

prompt_yesno() {
  # $1 message
  if $YES ; then
    return 0
  fi
  while true; do
    read -r -p "$1 [y/N]: " yn
    yn=${yn:-N}
    case "$yn" in
      [Yy]*) return 0 ;;
      *) return 1 ;;
    esac
  done
}

echo "Gathering resources to delete..."

# discover EB applications and environments if needed
found_eb_apps=()
found_eb_envs=()
mapfile -t found_eb_apps < <(aws elasticbeanstalk describe-applications --region "$REGION" --query 'Applications[].ApplicationName' --output text 2>/dev/null || true)
mapfile -t found_eb_envs < <(aws elasticbeanstalk describe-environments --region "$REGION" --query 'Environments[].EnvironmentName' --output text 2>/dev/null || true)

# discover Amplify apps
mapfile -t found_amplify_app_ids < <(aws amplify list-apps --region "$REGION" --query 'apps[].appId' --output text 2>/dev/null || true)

# discover S3 buckets that look like EB buckets in region
mapfile -t all_buckets < <(aws s3api list-buckets --query 'Buckets[].Name' --output text)
eb_buckets=()
for b in "${all_buckets[@]}"; do
  if [[ "$b" == elasticbeanstalk-*"-${REGION}"* ]] || [[ "$b" == *"${REGION}"*elasticbeanstalk* ]]; then
    eb_buckets+=("$b")
  fi
done

# combine S3 buckets: defaults + discovered EB buckets + amplify buckets if any
S3_BUCKETS=("${S3_BUCKETS[@]}" "${eb_buckets[@]}")

# discover CloudFormation stacks (Amplify often creates stacks prefixed by amplify-)
mapfile -t found_cf_stacks < <(aws cloudformation list-stacks --region "$REGION" --query 'StackSummaries[?StackStatus!=`DELETE_COMPLETE`].StackName' --output text 2>/dev/null || true)

# echo summary
echo "Elastic Beanstalk applications found: ${found_eb_apps[*]:-(none)}"
echo "Elastic Beanstalk environments found: ${found_eb_envs[*]:-(none)}"
echo "Amplify app IDs found: ${found_amplify_app_ids[*]:-(none)}"
echo "Elastic Beanstalk / discovered S3 buckets: ${S3_BUCKETS[*]:-(none)}"
echo "RDS instances (target list): ${RDS_INSTANCES[*]:-(none)}"
echo "CloudFormation stacks found: ${found_cf_stacks[*]:-(none)}"
echo

########## FUNCTIONS ##########

delete_eb_environment() {
  local env="$1"
  echo
  echo ">>> Elastic Beanstalk: terminate environment: $env"
  if $DRY_RUN; then
    echo "[dry-run] aws elasticbeanstalk terminate-environment --environment-name $env --region $REGION"
    return
  fi
  if prompt_yesno "Terminate EB environment '$env'?"; then
    aws elasticbeanstalk terminate-environment --environment-name "$env" --region "$REGION"
    echo "Termination request sent. Wait a few minutes for deletion to complete."
  fi
}

delete_eb_application() {
  local app="$1"
  echo
  echo ">>> Elastic Beanstalk: delete application: $app"
  if $DRY_RUN; then
    echo "[dry-run] aws elasticbeanstalk delete-application --application-name $app --region $REGION --terminate-env-by-force"
    return
  fi
  if prompt_yesno "Delete EB application '$app' and force-terminate environments?"; then
    aws elasticbeanstalk delete-application --application-name "$app" --region "$REGION" --terminate-env-by-force
    echo "Delete request sent."
  fi
}

delete_amplify_app() {
  local appid="$1"
  echo
  echo ">>> Amplify: delete app id: $appid"
  if $DRY_RUN; then
    echo "[dry-run] aws amplify delete-app --app-id $appid --region $REGION"
    return
  fi
  if prompt_yesno "Delete Amplify app id '$appid'?"; then
    aws amplify delete-app --app-id "$appid" --region "$REGION"
    echo "Delete request sent."
  fi
}

delete_rds_instance() {
  local db="$1"
  echo
  echo ">>> RDS: delete instance: $db"
  if $DRY_RUN; then
    if $SNAPSHOT_DB; then
      echo "[dry-run] aws rds delete-db-instance --db-instance-identifier $db --final-db-snapshot-identifier ${db}-final-$(date +%s) --region $REGION"
    else
      echo "[dry-run] aws rds delete-db-instance --db-instance-identifier $db --skip-final-snapshot --region $REGION"
    fi
    return
  fi
  if prompt_yesno "Delete RDS instance '$db'? (this is destructive)"; then
    if $SNAPSHOT_DB; then
      SNAP_NAME="${db}-final-$(date +%s)"
      echo "Taking final snapshot: $SNAP_NAME (this may take time)."
      aws rds delete-db-instance --db-instance-identifier "$db" --final-db-snapshot-identifier "$SNAP_NAME" --region "$REGION"
    else
      aws rds delete-db-instance --db-instance-identifier "$db" --skip-final-snapshot --region "$REGION"
    fi
    echo "Delete request sent."
  fi
}

empty_and_delete_s3_bucket() {
  local bucket="$1"
  echo
  echo ">>> S3: empty & delete bucket: $bucket"
  if $DRY_RUN; then
    echo "[dry-run] aws s3 rm s3://$bucket --recursive --region $REGION"
    echo "[dry-run] aws s3 rb s3://$bucket --region $REGION"
    return
  fi
  if prompt_yesno "Empty and delete S3 bucket '$bucket'? (this will remove ALL objects)"; then
    # remove bucket policy if present (attempt)
    echo "Removing bucket policy (if any) to allow deletion..."
    set +e
    policy=$(aws s3api get-bucket-policy --bucket "$bucket" --region "$REGION" 2>/dev/null || true)
    if [ -n "$policy" ]; then
      echo "Deleting bucket policy..."
      aws s3api delete-bucket-policy --bucket "$bucket" --region "$REGION" || true
    fi
    set -e

    echo "Deleting all objects (may take time)..."
    aws s3 rm "s3://$bucket" --recursive --region "$REGION" || true

    echo "Removing bucket..."
    aws s3 rb "s3://$bucket" --region "$REGION" || {
      echo "Failed to remove bucket $bucket. If there's a deny in bucket policy, remove it manually in S3 console."
    }
    echo "Bucket $bucket deletion attempted."
  fi
}

delete_cloudformation_stack() {
  local stack="$1"
  echo
  echo ">>> CloudFormation: delete stack: $stack"
  if $DRY_RUN; then
    echo "[dry-run] aws cloudformation delete-stack --stack-name $stack --region $REGION"
    return
  fi
  if prompt_yesno "Delete CloudFormation stack '$stack'?"; then
    aws cloudformation delete-stack --stack-name "$stack" --region "$REGION"
    echo "Delete request sent."
  fi
}

release_eip() {
  local alloc="$1"
  echo
  echo ">>> EC2: release Elastic IP allocation: $alloc"
  if $DRY_RUN; then
    echo "[dry-run] aws ec2 release-address --allocation-id $alloc --region $REGION"
    return
  fi
  if prompt_yesno "Release EIP allocation '$alloc'?"; then
    aws ec2 release-address --allocation-id "$alloc" --region "$REGION"
    echo "Release request sent."
  fi
}

delete_security_group() {
  local sgid="$1"
  echo
  echo ">>> EC2: delete security group: $sgid"
  if $DRY_RUN; then
    echo "[dry-run] aws ec2 delete-security-group --group-id $sgid --region $REGION"
    return
  fi
  if prompt_yesno "Delete security group '$sgid'? (ensure not used elsewhere)"; then
    aws ec2 delete-security-group --group-id "$sgid" --region "$REGION" || {
      echo "Failed to delete security group $sgid (in use?)."
    }
  fi
}

########## EXECUTION ##########

# 1) Terminate EB environments (found or configured)
echo
echo ">>> Step 1: Elastic Beanstalk environments"
if [ ${#EB_ENVS[@]} -eq 0 ] && [ ${#found_eb_envs[@]} -eq 0 ]; then
  echo "No EB environments detected"
else
  # If EB_ENVS array has default values, show both discovered + defaults
  candidates=()
  for env in "${EB_ENVS[@]}"; do
    candidates+=("$env")
  done
  for env in "${found_eb_envs[@]}"; do
    # avoid duplicates
    skip=false
    for x in "${candidates[@]}"; do [[ "$x" == "$env" ]] && skip=true; done
    $skip || candidates+=("$env")
  done

  echo "EB environments to consider for termination: ${candidates[*]}"
  for env in "${candidates[@]}"; do
    # skip empty
    [[ -z "$env" ]] && continue
    delete_eb_environment "$env"
  done
fi

# 2) Delete EB applications
echo
echo ">>> Step 2: Elastic Beanstalk applications"
if [ ${#EB_APPS[@]} -eq 0 ] && [ ${#found_eb_apps[@]} -eq 0 ]; then
  echo "No EB applications detected"
else
  candidates=()
  for app in "${EB_APPS[@]}"; do candidates+=("$app"); done
  for app in "${found_eb_apps[@]}"; do
    skip=false
    for x in "${candidates[@]}"; do [[ "$x" == "$app" ]] && skip=true; done
    $skip || candidates+=("$app")
  done

  echo "EB applications to consider for deletion: ${candidates[*]}"
  for app in "${candidates[@]}"; do
    [[ -z "$app" ]] && continue
    delete_eb_application "$app"
  done
fi

# 3) Delete Amplify apps (discovered or provided)
echo
echo ">>> Step 3: Amplify Apps"
amplify_candidates=("${AMPLIFY_APPS[@]}")
for aid in "${found_amplify_app_ids[@]}"; do
  skip=false
  for x in "${amplify_candidates[@]}"; do [[ "$x" == "$aid" ]] && skip=true; done
  $skip || amplify_candidates+=("$aid")
done

if [ ${#amplify_candidates[@]} -eq 0 ]; then
  echo "No Amplify apps detected"
else
  echo "Amplify apps to consider for deletion: ${amplify_candidates[*]}"
  for aid in "${amplify_candidates[@]}"; do
    delete_amplify_app "$aid"
  done
fi

# 4) Delete RDS instances
echo
echo ">>> Step 4: RDS Instances"
if [ ${#RDS_INSTANCES[@]} -eq 0 ]; then
  echo "No RDS instance identifiers configured"
else
  for db in "${RDS_INSTANCES[@]}"; do
    # check if instance exists
    if aws rds describe-db-instances --db-instance-identifier "$db" --region "$REGION" >/dev/null 2>&1; then
      delete_rds_instance "$db"
    else
      echo "RDS instance '$db' not found (skipping)."
    fi
  done
fi

# 5) Delete S3 buckets
echo
echo ">>> Step 5: S3 Buckets"
if [ ${#S3_BUCKETS[@]} -eq 0 ]; then
  echo "No S3 buckets listed for deletion."
else
  for b in "${S3_BUCKETS[@]}"; do
    if aws s3api head-bucket --bucket "$b" --region "$REGION" >/dev/null 2>&1; then
      empty_and_delete_s3_bucket "$b"
    else
      echo "Bucket $b not found (skipping)."
    fi
  done
fi

# 6) Delete CloudFormation stacks (optional)
echo
echo ">>> Step 6: CloudFormation stacks"
if [ ${#CF_STACKS[@]} -eq 0 ]; then
  echo "No explicit CF stacks configured. You may want to inspect the following stacks and delete as needed:"
  echo "${found_cf_stacks[*]:-(none)}"
  if prompt_yesno "Delete listed CloudFormation stacks?"; then
    for s in "${found_cf_stacks[@]}"; do delete_cloudformation_stack "$s"; done
  fi
else
  for s in "${CF_STACKS[@]}"; do delete_cloudformation_stack "$s"; done
fi

# 7) Release Elastic IPs
echo
echo ">>> Step 7: Release Elastic IPs"
if [ ${#EIPS[@]} -eq 0 ]; then
  echo "No EIP allocation IDs configured. Listing currently allocated EIPs in $REGION:"
  aws ec2 describe-addresses --region "$REGION" --query 'Addresses[].{AllocationId:AllocationId,PublicIp:PublicIp,InstanceId:InstanceId}' --output table || true
  if prompt_yesno "Release any of the above EIPs?"; then
    echo "Enter space-separated AllocationIds to release (or blank to skip):"
    read -r ids
    for id in $ids; do release_eip "$id"; done
  fi
else
  for id in "${EIPS[@]}"; do release_eip "$id"; done
fi

# 8) Security groups (awseb) cleanup guidance
echo
echo ">>> Step 8: Security groups (awseb)"
echo "Listing EB-related security groups (matching 'awseb' or 'elasticbeanstalk'):"
aws ec2 describe-security-groups --region "$REGION" --query 'SecurityGroups[?contains(GroupName, `awseb`) || contains(GroupName, `elasticbeanstalk`)].{GroupId:GroupId,GroupName:GroupName}' --output table || true
if prompt_yesno "Attempt to delete listed security groups? (only works if not in use)"; then
  mapfile -t sgids < <(aws ec2 describe-security-groups --region "$REGION" --query 'SecurityGroups[?contains(GroupName, `awseb`) || contains(GroupName, `elasticbeanstalk`) ].GroupId' --output text || true)
  for sg in "${sgids[@]}"; do delete_security_group "$sg"; done
fi

echo
echo "Cleanup actions submitted. Many deletions are asynchronous — wait a few minutes and re-run describe/list commands to confirm resources are gone."
echo "Check AWS Console for progress and CloudWatch/CloudFormation events if something stalls."

if $DRY_RUN; then
  echo "DRY RUN complete — no destructive actions were performed."
fi

echo
echo "Done."
