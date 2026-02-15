#!/bin/bash
# Last updated: 2026-02-06 (21:41) - Admin pages fixed

# Exit on any error
set -e

echo "--- 🔄 Starting Auto-Deployment ---"

# Navigate to the project directory
cd /var/www/Zagroda_adoption

# Force the local server branch to match the remote branch (handles rollbacks/force pushes)
echo "--- 📥 Resetting to latest code ---"
git fetch origin main
git reset --hard origin/main

# Rebuild and restart the Docker container
echo "--- 🏗️ Rebuilding and restarting Docker ---"
docker compose up --build -d

echo "--- ✅ Deployment Complete! ---"
