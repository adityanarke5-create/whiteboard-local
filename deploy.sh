#!/bin/bash
set -euo pipefail

################################################################################
# Free-Tier–Aware Deploy Script (with SSH key support)
# - Automatically ensures EC2 key pair exists for SSH access
# - Free-tier-safe (uses single t2.micro instances)
# - Builds and deploys both backend and frontend to Elastic Beanstalk
# - Automatically fixes Next.js standalone CSS issue by including .next/static
################################################################################

# ---------- CONFIG ----------
AWS_REGION="${AWS_REGION:-ap-south-1}"
INSTANCE_TYPE="${INSTANCE_TYPE:-t2.micro}"
EB_BACKEND_APP="${EB_BACKEND_APP:-Collaborativ-WhiteBoard-backend}"
EB_BACKEND_ENV="${EB_BACKEND_ENV:-whiteboard-backend-env}"
EB_FRONTEND_APP="${EB_FRONTEND_APP:-Collaborativ-WhiteBoard-frontend}"
EB_FRONTEND_ENV="${EB_FRONTEND_ENV:-whiteboard-frontend-env}"
EB_PLATFORM="${EB_PLATFORM:-Node.js 20 running on 64bit Amazon Linux 2023}"
EB_KEYNAME="${EB_KEYNAME:-whiteboard-key}"   # Default SSH key pair name
BUILD_WAIT_SECONDS=8
# ----------------------------

echo "🚀 Starting Free-Tier-aware deploy with SSH key (region: $AWS_REGION, instance: $INSTANCE_TYPE)"
echo

# ---------- Prechecks ----------
command -v aws >/dev/null 2>&1 || { echo "❌ aws CLI required"; exit 1; }
command -v eb >/dev/null 2>&1 || { echo "❌ eb CLI required"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm required"; exit 1; }

echo "🔍 Checking AWS credentials..."
aws sts get-caller-identity >/dev/null || { echo "❌ AWS credentials not configured"; exit 1; }
echo "✅ AWS credentials verified"
echo

# ---------- SSH Key Management ----------
echo "🔑 Checking EC2 key pair: $EB_KEYNAME"
if ! aws ec2 describe-key-pairs --key-names "$EB_KEYNAME" --region "$AWS_REGION" >/dev/null 2>&1; then
  echo "🆕 Key pair not found. Creating new one: $EB_KEYNAME ..."
  aws ec2 create-key-pair --key-name "$EB_KEYNAME" --region "$AWS_REGION" \
    --query "KeyMaterial" --output text > "${EB_KEYNAME}.pem"
  chmod 400 "${EB_KEYNAME}.pem"
  echo "✅ Created and saved key: ${EB_KEYNAME}.pem"
else
  echo "✅ Key pair already exists in region $AWS_REGION"
fi
echo

# ---------- Free tier warning ----------
echo "⚠️  NOTE: Running both backend and frontend 24/7 may exceed Free Tier (750 hrs/month)."
read -r -p "Do you want to continue deploying BOTH environments? [y/N]: " confirm_both
confirm_both=${confirm_both:-N}
if [[ ! "$confirm_both" =~ ^[Yy]$ ]]; then
  echo "👉 Aborting. Run again with CONFIRM_FRONTEND=y to only deploy backend if needed."
  exit 0
fi

# ---------- Helper: read env key ----------
read_env_key() {
  local envfile="$1"; local key="$2"
  if [ -f "$envfile" ]; then
    grep -E "^${key}=" "$envfile" | awk -F= '{print substr($0, index($0,$2))}' | sed 's/^["'\'']\|["'\'']$//g' || true
  else
    echo ""
  fi
}

# ---------------- BACKEND ----------------
echo
echo "📦 Deploying BACKEND to Elastic Beanstalk (single-instance $INSTANCE_TYPE)..."
pushd backend >/dev/null

if [ ! -f Procfile ]; then
  echo "web: npm run start" > Procfile
  echo "✅ Created Procfile for backend"
fi

DATABASE_URL="$(read_env_key .env DATABASE_URL)"
COGNITO_USER_POOL_ID="$(read_env_key .env COGNITO_USER_POOL_ID)"
COGNITO_CLIENT_ID="$(read_env_key .env COGNITO_CLIENT_ID)"
COGNITO_DOMAIN="$(read_env_key .env COGNITO_DOMAIN)"

if [ -z "${DATABASE_URL:-}" ]; then
  echo "❗ DATABASE_URL not found. Please set it in backend/.env"
  popd >/dev/null; exit 1
fi

echo "📥 Installing backend dependencies..."
npm ci || npm install

if [ ! -d .elasticbeanstalk ]; then
  echo "🔧 Initializing EB for backend app: $EB_BACKEND_APP"
  eb init "$EB_BACKEND_APP" -p "$EB_PLATFORM" --region "$AWS_REGION" --keyname "$EB_KEYNAME"
else
  echo "✅ Backend EB initialized"
fi

if ! eb status "$EB_BACKEND_ENV" >/dev/null 2>&1; then
  echo "🧩 Creating backend environment..."
  eb create "$EB_BACKEND_ENV" --single --instance_type "$INSTANCE_TYPE" \
    --envvars NODE_ENV=production,PORT=8080 --keyname "$EB_KEYNAME" --region "$AWS_REGION"
else
  echo "✅ Backend environment $EB_BACKEND_ENV already exists"
fi

echo "🔐 Setting backend environment variables..."
set +u
eb setenv DATABASE_URL="$DATABASE_URL" NODE_ENV=production PORT=8080 AWS_REGION="$AWS_REGION" \
  ${COGNITO_USER_POOL_ID:+COGNITO_USER_POOL_ID="$COGNITO_USER_POOL_ID"} \
  ${COGNITO_CLIENT_ID:+COGNITO_CLIENT_ID="$COGNITO_CLIENT_ID"} \
  ${COGNITO_DOMAIN:+COGNITO_DOMAIN="$COGNITO_DOMAIN"} >/dev/null
set -u

echo "📤 Deploying backend..."
eb deploy "$EB_BACKEND_ENV"

BACKEND_CNAME="$(eb status "$EB_BACKEND_ENV" | awk -F': ' '/CNAME:/{print $2}' || true)"
echo "🔗 Backend URL: http://$BACKEND_CNAME"
popd >/dev/null

echo "⏳ Waiting ${BUILD_WAIT_SECONDS}s for backend to stabilize..."
sleep "$BUILD_WAIT_SECONDS"

# ---------------- FRONTEND ----------------
echo
echo "🎨 Deploying FRONTEND to Elastic Beanstalk (single-instance $INSTANCE_TYPE)..."
pushd frontend >/dev/null

FRONTEND_BACKEND_URL="http://${BACKEND_CNAME:-$EB_BACKEND_ENV}"

# Read frontend environment variables (if present locally)
NEXT_PUBLIC_AWS_REGION="$(read_env_key .env.production NEXT_PUBLIC_AWS_REGION)"
NEXT_PUBLIC_COGNITO_USER_POOL_ID="$(read_env_key .env.production NEXT_PUBLIC_COGNITO_USER_POOL_ID)"
NEXT_PUBLIC_COGNITO_CLIENT_ID="$(read_env_key .env.production NEXT_PUBLIC_COGNITO_CLIENT_ID)"
NEXT_PUBLIC_COGNITO_DOMAIN="$(read_env_key .env.production NEXT_PUBLIC_COGNITO_DOMAIN)"

# If locally missing, fall back to defaults (so the script doesn't fail unnecessarily)
NEXT_PUBLIC_AWS_REGION="${NEXT_PUBLIC_AWS_REGION:-$AWS_REGION}"
NEXT_PUBLIC_COGNITO_USER_POOL_ID="${NEXT_PUBLIC_COGNITO_USER_POOL_ID:-}"
NEXT_PUBLIC_COGNITO_CLIENT_ID="${NEXT_PUBLIC_COGNITO_CLIENT_ID:-}"
NEXT_PUBLIC_COGNITO_DOMAIN="${NEXT_PUBLIC_COGNITO_DOMAIN:-}"

cat > .env.production <<EOF
NEXT_PUBLIC_BACKEND_URL=${FRONTEND_BACKEND_URL}
NEXT_PUBLIC_AWS_REGION=${NEXT_PUBLIC_AWS_REGION}
NODE_ENV=production
# AWS Cognito (optional — override in AWS console if empty)
NEXT_PUBLIC_COGNITO_USER_POOL_ID=${NEXT_PUBLIC_COGNITO_USER_POOL_ID}
NEXT_PUBLIC_COGNITO_CLIENT_ID=${NEXT_PUBLIC_COGNITO_CLIENT_ID}
NEXT_PUBLIC_COGNITO_DOMAIN=${NEXT_PUBLIC_COGNITO_DOMAIN}
EOF
echo "✅ Created/updated frontend/.env.production with backend URL: $FRONTEND_BACKEND_URL"

# If the project is configured to produce a standalone build, the server is at:
#   .next/standalone/server.js
# We must start that file on EB instead of running `next start`.
if [ ! -f Procfile ]; then
  # Use standalone server if present, otherwise fall back to next start
  if [ -f ".next/standalone/server.js" ]; then
    echo "web: node .next/standalone/server.js" > Procfile
  else
    echo "web: npm run start" > Procfile
  fi
  echo "✅ Wrote Procfile for frontend"
else
  # if Procfile exists, ensure it will use standalone server when available
  if grep -q "npm run start" Procfile && [ -f ".next/standalone/server.js" ]; then
    echo "⚠️ Replacing Procfile to use standalone server (safer for EB standalone deployments)"
    echo "web: node .next/standalone/server.js" > Procfile
  fi
fi

echo "📥 Installing frontend dependencies (clean install)..."
# remove local node_modules to avoid shipping dev artifacts accidentally
rm -rf node_modules || true
npm ci || npm install

echo "🏗 Building Next.js frontend..."
npm run build

# ---------------- Fix for standalone CSS issue ----------------
# If output: 'standalone' is used, Next produces .next/standalone plus .next/static.
# Copy static assets into the standalone runtime so the server can serve them.
if [ -d ".next/standalone" ]; then
  echo "🔧 Preparing standalone runtime: copying static assets into .next/standalone/.next/static"
  mkdir -p .next/standalone/.next
  if [ -d ".next/static" ]; then
    rm -rf .next/standalone/.next/static || true
    cp -r .next/static .next/standalone/.next/static
    echo "✅ Copied .next/static -> .next/standalone/.next/static"
  else
    echo "⚠️ Warning: .next/static not found after build — CSS/static might be missing"
  fi

  # Fix permissions so EB can start the standalone server and read files
  echo "🔐 Fixing permissions under .next/standalone for EB runtime"
  chmod -R a+rX .next/standalone || true
else
  echo "⚠️ Notice: .next/standalone not present. Make sure next.config.js sets output: 'standalone' if you want standalone deployment."
fi

# ---------------- Create/overwrite a safe .ebignore for frontend ----------------
cat > .ebignore <<'EOF'
# Ignore local dev artifacts and OS files
node_modules
.next/cache
.next/build-manifest.json
npm-debug.log
.DS_Store
.git
.gitignore
.env
.env.local
.env.development
*.pem
*.log

# Keep the standalone server and its static assets (if using output: 'standalone')
!.next/standalone/
!.next/standalone/.next/
!.next/standalone/.next/static/

# Also allow public, package.json, Procfile and other runtime files
!package.json
!Procfile
!next.config.js
!.env.production
!.platform/
!.elasticbeanstalk/
EOF
echo "✅ Wrote frontend/.ebignore to exclude node_modules and include built runtime"

if [ ! -d .elasticbeanstalk ]; then
  echo "🔧 Initializing EB for frontend app: $EB_FRONTEND_APP"
  eb init "$EB_FRONTEND_APP" -p "$EB_PLATFORM" --region "$AWS_REGION" --keyname "$EB_KEYNAME"
else
  echo "✅ Frontend EB initialized"
fi

if ! eb status "$EB_FRONTEND_ENV" >/dev/null 2>&1; then
  echo "🧩 Creating frontend environment..."
  eb create "$EB_FRONTEND_ENV" --single --instance_type "$INSTANCE_TYPE" \
    --envvars NODE_ENV=production,PORT=3000 --keyname "$EB_KEYNAME" --region "$AWS_REGION"
else
  echo "✅ Frontend environment $EB_FRONTEND_ENV already exists"
fi

eb setenv NEXT_PUBLIC_BACKEND_URL="$FRONTEND_BACKEND_URL" NODE_ENV=production NEXT_PUBLIC_AWS_REGION="$NEXT_PUBLIC_AWS_REGION" >/dev/null

echo "📤 Deploying frontend..."
eb deploy "$EB_FRONTEND_ENV"

FRONTEND_CNAME="$(eb status "$EB_FRONTEND_ENV" | awk -F': ' '/CNAME:/{print $2}' || true)"
echo "🌐 Frontend URL: http://$FRONTEND_CNAME"
popd >/dev/null

# ---------------- Wrap-up ----------------
echo
echo "🎉 Deployment complete!"
echo "Backend: http://$BACKEND_CNAME"
echo "Frontend: http://$FRONTEND_CNAME"
echo
echo "✅ SSH Key: ${EB_KEYNAME}.pem"
echo "   To SSH into instance: eb ssh --region $AWS_REGION"
echo "   Or manually: ssh -i ${EB_KEYNAME}.pem ec2-user@<instance-public-ip>"
echo
echo "⚠️  Reminder: Terminate unused environments to avoid charges:"
echo "   eb terminate $EB_BACKEND_ENV --force"
echo "   eb terminate $EB_FRONTEND_ENV --force"
echo
exit 0
