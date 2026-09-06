#!/bin/bash
# Deploy script for Zagroda Alpakoterapii — called by GitHub Actions CI/CD
# ⚠️  NEVER edit files directly on this server. All changes go through git → push → GitHub Actions.
# Last updated: 2026-09-06 — Added drift detection and Stef Dashboard alerts

set -e

STEF_URL="https://stef.futuresolutionsai.com/api/logs"
STEF_KEY="fs-log-key-2026"
APP="zagroda-website"
SITE_URL="https://zagrodaalpakoterapii.com"

# Helper: post to Stef Dashboard
stef_log() {
  local level="$1"
  local message="$2"
  curl -s -X POST "$STEF_URL" \
    -H "Content-Type: application/json" \
    -H "X-API-Key: $STEF_KEY" \
    -d "{\"app\":\"$APP\",\"level\":\"$level\",\"message\":\"$message\"}" \
    > /dev/null 2>&1 || true
}

echo "--- 🔄 Starting Auto-Deployment ---"

cd /var/www/Zagroda_adoption

# ── 1. DRIFT DETECTION ──────────────────────────────────────────────────
# Check if someone edited files directly on the server (bypassing git)
echo "--- 🔍 Checking for VPS drift (unauthorized local edits) ---"
DIRTY=$(git status --porcelain 2>/dev/null || echo "")
if [ -n "$DIRTY" ]; then
  echo "⚠️  DRIFT DETECTED — files were edited directly on VPS:"
  echo "$DIRTY"
  stef_log "warn" "⚠️ VPS DRIFT DETECTED during deploy — files were edited directly on server, bypassing GitHub. Reverting to git HEAD. Changed files: $(echo $DIRTY | tr '\n' ', ')"
  # Force revert — git is the single source of truth
  git checkout -- .
  echo "   → Reverted local changes."
fi

# ── 2. PULL LATEST CODE ─────────────────────────────────────────────────
echo "--- 📥 Resetting to latest code ---"
git fetch origin main
git reset --hard origin/main
DEPLOYED_COMMIT=$(git rev-parse --short HEAD)
echo "   → Deployed commit: $DEPLOYED_COMMIT"

# ── 3. REBUILD DOCKER ───────────────────────────────────────────────────
echo "--- 🏗️ Rebuilding and restarting Docker ---"
docker compose build --no-cache
docker compose up -d
docker image prune -f

echo "--- ✅ Deployment Complete (commit: $DEPLOYED_COMMIT) ---"

# ── 4. SMOKE TESTS ──────────────────────────────────────────────────────
echo "--- 🧪 Running smoke tests (waiting 30s for container warmup) ---"
sleep 30

FAIL=0
RESULTS=""
for url in "/" "/en/stay" "/nl/welkom" "/en/discover" "/en/activities" "/sitemap.xml" "/pl"; do
  STATUS="000"
  for attempt in 1 2 3; do
    STATUS=$(curl -o /dev/null -s -w "%{http_code}" "${SITE_URL}${url}")
    if [ "$STATUS" = "200" ] || [ "$STATUS" = "301" ] || [ "$STATUS" = "307" ] || [ "$STATUS" = "308" ]; then
      break
    fi
    sleep 3
  done
  echo "  $url → $STATUS"
  RESULTS="$RESULTS $url:$STATUS"
  if [ "$STATUS" != "200" ] && [ "$STATUS" != "301" ] && [ "$STATUS" != "307" ] && [ "$STATUS" != "308" ]; then
    echo "  ⚠️  WARNING: $url returned $STATUS"
    FAIL=1
  fi
done

# ── 5. GA4 VERIFICATION ─────────────────────────────────────────────────
echo "--- 🔍 Verifying GA4 analytics ---"
GA4_CHECK=$(curl -s "${SITE_URL}/pl" | grep -c 'G-V9R1JJYYSG' || echo "0")
if [ "$GA4_CHECK" -ge 1 ]; then
  echo "  ✅ GA4 tracking present ($GA4_CHECK references)"
else
  echo "  ❌ GA4 tracking MISSING!"
  FAIL=1
  stef_log "critical" "❌ GA4 tracking MISSING after deploy (commit: $DEPLOYED_COMMIT). G-V9R1JJYYSG not found in HTML."
fi

# ── 6. REPORT RESULTS ───────────────────────────────────────────────────
if [ "$FAIL" -eq 0 ]; then
  echo "--- ✅ All smoke tests passed! ---"
  stef_log "info" "✅ Deploy smoke tests passed (commit: $DEPLOYED_COMMIT). Results:$RESULTS GA4:present"
else
  echo "--- ⚠️ Some smoke tests had warnings ---"
  stef_log "warn" "⚠️ Deploy smoke tests had warnings (commit: $DEPLOYED_COMMIT). Results:$RESULTS"
fi
