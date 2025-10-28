# Whiteboard Application Deployment Scripts

This document explains how to use the automated deployment scripts for the Whiteboard application.

## Prerequisites

Before using these scripts, ensure you have the following installed:

1. **AWS CLI** - [Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
2. **EB CLI** - [Installation Guide](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)
3. **Amplify CLI** - Install with `npm install -g @aws-amplify/cli`
4. **Node.js and npm** - [Download](https://nodejs.org/)
5. **AWS Account** with appropriate permissions

## Script Overview

### 1. Deployment Script (`deploy.sh` or `deploy.bat`)

Deploys the application to AWS services:
- Backend to Elastic Beanstalk
- Frontend to Elastic Beanstalk (standalone Next.js application)
- Uses RDS for PostgreSQL database (manual setup required)

**Usage (Linux/Mac):**
```bash
./deploy.sh
```

**Usage (Windows):**
```cmd
deploy.bat
```

### 2. Development Script (`dev.sh` or `dev.bat`)

Sets up and runs the application locally for development:
- Installs dependencies
- Sets up environment variables
- Runs both frontend and backend servers

**Usage (Linux/Mac):**
```bash
./dev.sh
```

**Usage (Windows):**
```cmd
dev.bat
```

### 3. Destroy Script (`destroy.sh` or `destroy.bat`)

Removes deployed AWS resources to prevent additional charges:
- Deletes Elastic Beanstalk environments and applications
- Provides guidance for manual cleanup of other resources

**Usage (Linux/Mac):**
```bash
./destroy.sh
```

**Usage (Windows):**
```cmd
destroy.bat
```

## Setup Instructions

### Initial Configuration

1. **Configure AWS CLI:**
   ```bash
   aws configure
   ```

2. **Set up environment variables:**
   
   Update the following files with your actual values:
   
   **Backend Configuration** (`backend/.env`):
   ```env
   # Database
   DATABASE_URL=your-postgresql-connection-string
   
   # AWS Cognito
   AWS_REGION=your-aws-region
   COGNITO_USER_POOL_ID=your-cognito-user-pool-id
   COGNITO_CLIENT_ID=your-cognito-client-id
   COGNITO_DOMAIN=your-cognito-domain
   
   PORT=8080
   NODE_ENV=production
   ```
   
   **Frontend Configuration** (`frontend/.env.production`):
   ```env
   NEXT_PUBLIC_BACKEND_URL=your-backend-url
   NEXT_PUBLIC_AWS_REGION=your-aws-region
   NODE_ENV=production
   
   # AWS Cognito
   NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-cognito-user-pool-id
   NEXT_PUBLIC_COGNITO_CLIENT_ID=your-cognito-client-id
   NEXT_PUBLIC_COGNITO_DOMAIN=your-cognito-domain
   ```

### Database Setup

The deployment uses Amazon RDS for PostgreSQL. You'll need to:

1. Create an RDS PostgreSQL instance (db.t2.micro for Free Tier)
2. Update the `DATABASE_URL` environment variable in your `backend/.env` file
3. Run database migrations after deployment:
   ```bash
   eb ssh
   # Then run: npx prisma migrate deploy
   ```

### Authentication Setup

The application uses AWS Cognito for authentication:

1. Create a Cognito User Pool
2. Create an App Client in the User Pool
3. Update the environment variables as shown in the configuration section above

## Security Improvements

### Environment Variable Management

The updated deployment process now:
- Validates all required environment variables before deployment
- Prevents deployment with placeholder values
- Uses environment variables instead of hardcoded values in scripts
- Provides clear error messages for missing or invalid configuration

### Best Practices

1. Never commit actual credentials to version control
2. Use AWS Secrets Manager or Parameter Store for production secrets
3. Rotate credentials regularly
4. Use IAM roles instead of access keys when possible

## Free Tier Considerations

To stay within AWS Free Tier limits:

1. **Elastic Beanstalk**: Uses the free service (you only pay for underlying resources)
2. **RDS**: Use db.t2.micro instance (750 hours/month for 12 months)
3. **Amplify Hosting**: Includes 5GB storage and 15GB data transfer (12 months)
4. **Cognito**: Includes 50,000 monthly active users (12 months)

## Troubleshooting

### Common Issues

1. **Permission Errors**: Ensure your AWS user has appropriate permissions for:
   - Elastic Beanstalk
   - RDS
   - IAM (for creating roles)

2. **Environment Variables**: Make sure all required environment variables are set correctly
   - The deployment script will now validate these and prevent deployment with placeholder values

3. **Database Connection**: Verify the DATABASE_URL format and network access to RDS

4. **Elastic Beanstalk Environment**: If you see an error like "This branch does not have a default environment", the script will now automatically create an environment for you. If you still encounter issues, you can manually create an environment:
   ```bash
   cd backend
   eb create whiteboard-backend-env
   eb deploy
   ```

### Getting Help

If you encounter issues:
1. Check the console output for error messages
2. Verify all prerequisites are installed and configured
3. Ensure your AWS credentials have the necessary permissions
4. Check AWS service limits and Free Tier status

## Security Notes

- Never commit sensitive information like passwords or access keys to version control
- Use IAM roles instead of access keys when possible
- Regularly rotate credentials
- Monitor your AWS usage to avoid unexpected charges
- The updated scripts now validate configuration before deployment to prevent common security issues