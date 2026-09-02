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

# Rebuild and restart the Docker container (--no-cache ensures fresh build)
echo "--- 🏗️ Rebuilding and restarting Docker ---"
docker compose build --no-cache
docker compose up -d
docker image prune -f

echo "--- ✅ Deployment Complete! ---"

# ── Post-deploy smoke test ──────────────────────────────────────────────
echo "--- 🧪 Running smoke test (waiting 25s for container warmup) ---"
sleep 25
FAIL=0
for url in "/" "/en/stay" "/nl/welkom" "/en/discover" "/en/activities" "/sitemap.xml"; do
  STATUS="000"
  for attempt in 1 2 3; do
    STATUS=$(curl -o /dev/null -s -w "%{http_code}" "https://zagrodaalpakoterapii.com${url}")
    if [ "$STATUS" = "200" ] || [ "$STATUS" = "301" ] || [ "$STATUS" = "307" ] || [ "$STATUS" = "308" ]; then
      break
    fi
    sleep 3
  done
  echo "  $url → $STATUS"
  if [ "$STATUS" != "200" ] && [ "$STATUS" != "301" ] && [ "$STATUS" != "307" ] && [ "$STATUS" != "308" ]; then
    echo "  ⚠️  WARNING: $url returned $STATUS"
    FAIL=1
  fi
done

if [ "$FAIL" -eq 0 ]; then
  echo "--- ✅ All smoke tests passed! ---"
else
  echo "--- ⚠️ Some smoke tests had warnings, but container is running ---"
fi
