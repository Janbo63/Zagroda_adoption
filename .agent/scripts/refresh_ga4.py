"""
refresh_ga4.py
One-shot script: pull fresh GA4 data then rebuild the dashboard JSON.

Usage (from Reachout/scripts via the campaigns dashboard):
  python refresh_ga4.py

Calls:
  1. node ZAPnew2/.agent/scripts/ga4-pull.js   — fetches traffic, countries, events from GA4 API
  2. python export_for_dashboard.py              — rebuilds outreach_data.json for the Next.js dashboard
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent.parent  # repo root
GA4_SCRIPT = ROOT / "ZAPnew2" / ".agent" / "scripts" / "ga4-pull.js"
EXPORT_SCRIPT = Path(__file__).parent / "export_for_dashboard.py"

def run(cmd, cwd=None, env_extra=None):
    import os
    env = {**os.environ, **(env_extra or {})}
    result = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, env=env)
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    return result.returncode

print("🔄 Step 1/2 — Pulling fresh data from GA4 API...")
rc = run(["node", str(GA4_SCRIPT)], cwd=str(GA4_SCRIPT.parent))
if rc != 0:
    print("❌ GA4 pull failed — check credentials in .agent/scripts/ga4-credentials.json")
    sys.exit(rc)

print("\n🔄 Step 2/2 — Rebuilding dashboard JSON...")
rc = run([sys.executable, str(EXPORT_SCRIPT)], cwd=str(EXPORT_SCRIPT.parent))
if rc != 0:
    print("❌ Dashboard export failed")
    sys.exit(rc)

print("\n✅ Done! Refresh the dashboard to see updated GA4 data.")
