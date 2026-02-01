#!/bin/bash

# Deployment Helper Script for Alpaca Farm Website
# This script helps link the local project to a new GitHub repository and prepares it for VPS deployment.

echo "============================================"
echo "   Alpaca Farm Deployment Prep Tool"
echo "============================================"

# 1. Ask for the new repository URL
read -p "Enter your NEW GitHub repository URL (e.g., https://github.com/your-username/your-repo.git): " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "Error: No repository URL provided."
    exit 1
fi

# 2. Check current remotes
echo "--- Checking current Git remotes ---"
git remote -v

# 3. Rename old origin to 'legacy' to keep it as a backup
echo "--- Renaming old 'origin' to 'legacy' ---"
git remote rename origin legacy 2>/dev/null || echo "Info: 'origin' not found, skipping rename."

# 4. Add the new repository as the new 'origin'
echo "--- Adding new remote as 'origin' ---"
git remote add origin "$REPO_URL"

# 5. Push the code to the new repository
echo "--- Pushing code to the new repository ---"
git add .
git commit -m "chore: prepare for staging deployment"
git push -u origin main

echo "============================================"
echo " SUCCESS! Your code is now in the new repo."
echo "============================================"
echo "Next steps on your VPS:"
echo "1. git clone $REPO_URL"
echo "2. cd into the folder"
echo "3. Run: docker-compose up --build -d"
echo "============================================"
