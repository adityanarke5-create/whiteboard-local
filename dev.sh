#!/bin/bash

# Local Development Script for Whiteboard Application
# This script sets up and runs the application locally for testing and development

set -e  # Exit on any error

echo "💻 Setting up Whiteboard Application for Local Development..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install it first: https://www.npmjs.com/get-npm"
    exit 1
fi

echo "✅ npm is installed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Build backend TypeScript files
echo "🔨 Building backend..."
npm run build

# Check if Prisma is installed and set up
if [ -d node_modules/.prisma ] || [ -d prisma ]; then
    echo "✅ Prisma is set up"
else
    echo "⚠️  Prisma may not be properly set up. You might need to run 'npx prisma generate'"
fi

cd ..

# Install frontend dependencies
echo "🎨 Installing frontend dependencies..."
cd frontend
npm install

cd ..

# Create .env files if they don't exist
echo "📝 Setting up environment variables..."

# Backend .env file
if [ ! -f backend/.env ]; then
    echo "Creating backend .env file..."
    cat > backend/.env << EOF
# Development Environment Variables
PORT=3001
NODE_ENV=development

# Database (update with your local PostgreSQL connection string)
DATABASE_URL=postgresql://username:password@localhost:5432/whiteboard_dev

# Cognito settings (update with your AWS Cognito settings)
COGNITO_USER_POOL_ID=your-user-pool-id
COGNITO_CLIENT_ID=your-client-id
AWS_REGION=your-region
EOF
    echo "✅ Created backend .env file - Please update with your actual values"
else
    echo "✅ Backend .env file already exists"
fi

# Frontend .env file
if [ ! -f frontend/.env.local ]; then
    echo "Creating frontend .env.local file..."
    cat > frontend/.env.local << EOF
# Development Environment Variables
NEXT_PUBLIC_COGNITO_USER_POOL_ID=your-user-pool-id
NEXT_PUBLIC_COGNITO_CLIENT_ID=your-client-id
NEXT_PUBLIC_COGNITO_DOMAIN=your-domain.auth.us-east-1.amazoncognito.com
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
EOF
    echo "✅ Created frontend .env.local file - Please update with your actual values"
else
    echo "✅ Frontend .env.local file already exists"
fi

# Start both applications using the root package.json script
echo "🚀 Starting applications..."

# Function to clean up background processes on exit
cleanup() {
    echo "🛑 Shutting down applications..."
    kill $ROOT_PID 2>/dev/null || true
    wait $ROOT_PID 2>/dev/null
    echo "✅ Applications shut down successfully"
    exit 0
}

# Set up trap to catch SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Start both frontend and backend using concurrently
echo "🔧 Starting both frontend and backend servers..."
npm run dev &
ROOT_PID=$!

echo "✅ Applications started successfully!"
echo "🌐 Backend is running on: http://localhost:3001"
echo "🌐 Frontend is running on: http://localhost:3000"
echo "📌 Press Ctrl+C to stop both applications"

# Wait for the process
wait $ROOT_PID