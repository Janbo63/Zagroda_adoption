#!/bin/bash

# Exit on any error
set -e

echo "--- 🔄 Starting Auto-Deployment ---"

# Navigate to the project directory
cd /var/www/Zagroda_adoption

# Pull the latest changes from GitHub
echo "--- 📥 Pulling latest code ---"
git pull origin main

# Rebuild and restart the Docker container
echo "--- 🏗️ Rebuilding and restarting Docker ---"
docker compose up --build -d

echo "--- ✅ Deployment Complete! ---"
