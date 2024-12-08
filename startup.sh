#!/bin/bash

# Kill any processes running on port 3000
echo "Checking for processes on port 3000..."
npx kill-port 3000

# Install dependencies if needed
echo "Installing dependencies..."
npm install

# Start the development server in the background with nohup
echo "Starting development server..."
nohup npm run dev > nohup.out 2>&1 &

echo "Server started! You can close this window."
echo "To view server logs, check nohup.out"
