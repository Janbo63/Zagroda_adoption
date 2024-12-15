#!/bin/bash

# Kill any processes running on port 3001
echo "Checking for processes on port 3001..."
npx kill-port 3001

# Install dependencies if needed
echo "Installing dependencies..."
npm install
npm install fs-extra

# Build the production version
echo "Building production version..."
npm run build

# Copy static files to standalone directory
echo "Copying static files..."
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/

# Start the production server using PM2
echo "Starting test server..."
pm2 stop zagroda-test || true
pm2 delete zagroda-test || true
PORT=3001 pm2 start .next/standalone/server.js --name "zagroda-test"

echo "Test server started on port 3001!"
echo "To view server logs, use: pm2 logs zagroda-test"
