#!/bin/bash

# Database Migration Script for Whiteboard Application
# Run this script after deploying to Elastic Beanstalk to set up the database

echo "📊 Running database migrations..."

# Check if EB CLI is installed
if ! command -v eb &> /dev/null; then
    echo "❌ EB CLI is not installed. Please install it first: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html"
    exit 1
fi

# Check if we're in the backend directory
if [ ! -f "package.json" ] || [ ! -d "prisma" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

# Check if EB environment exists
echo "🔍 Checking EB environment..."
if ! eb status &> /dev/null; then
    echo "❌ No EB environment found. Please deploy the application first."
    exit 1
fi

# Validate that required environment variables are set
echo "🔍 Validating environment configuration..."
if [ -f ".env" ]; then
    db_url=$(grep -E "^DATABASE_URL=" .env | cut -d '=' -f2-)
    if [ -z "$db_url" ] || [ "$db_url" = "your-database-connection-string" ]; then
        echo "❌ DATABASE_URL not properly configured in .env file"
        exit 1
    fi
    echo "✅ DATABASE_URL is configured"
else
    echo "❌ .env file not found"
    exit 1
fi

echo "🔧 Running Prisma migrations on EB environment..."
echo "📝 You'll need to confirm the SSH connection to your EB instance"

# SSH into EB instance and run migrations
if eb ssh -c "cd /var/app/current && npx prisma migrate deploy"; then
    echo "✅ Database migrations completed successfully!"
else
    echo "❌ Database migrations failed!"
    echo "📝 If you encountered any issues, you can manually SSH into your EB instance:"
    echo "   eb ssh"
    echo "   # Then run: cd /var/app/current && npx prisma migrate deploy"
    exit 1
fi