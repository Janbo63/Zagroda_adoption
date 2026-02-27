---
description: Pull fresh Meta Ads & GA4 data and generate a prioritised marketing analysis
---

# /meta-ads-review Workflow

This workflow pulls the latest campaign and audience data and produces a prioritised action report.

## Prerequisites
Ensure the scripts are set up (see `f:\New Alpaca Site\ZAPnew2\.agent\scripts\README.md`).

## Steps

// turbo-all

1. Pull Meta Ads data:
```powershell
node "f:\New Alpaca Site\ZAPnew2\.agent\scripts\meta-ads-pull.js"
```

2. Pull GA4 data:
```powershell
node "f:\New Alpaca Site\ZAPnew2\.agent\scripts\ga4-pull.js"
```

3. Tell me: "analyse the latest ads data" and I will read the freshly generated CSVs from `f:\New Alpaca Site\ZAPnew2\.agent\data\` and produce a full report covering:
   - Campaign performance vs. previous period
   - Audience breakdown (age, gender, country)
   - Top landing pages from paid traffic
   - Priority actions ranked by ROI
