# Meta Ads & GA4 Data Pull Scripts
## Zagroda Alpakoterapii — Marketing Automation

These scripts pull fresh data from Meta Ads and Google Analytics 4 directly to your machine. Once set up, you just run them before asking for any marketing analysis.

---

## ⚡ Quick Setup (One-time, ~10 minutes)

### Step 1 — Install Dependencies

Open PowerShell in the `ZAPnew2` folder and run:

```powershell
cd "f:\New Alpaca Site\ZAPnew2\.agent\scripts"
npm install
```

### Step 2 — Create Your .env File

Copy the template and fill in your credentials:

```powershell
Copy-Item .env.example .env
```

Then open `.env` in Notepad and fill in the values (see below for where to get each one).

### Step 3 — Test the Scripts

```powershell
node meta-ads-pull.js
node ga4-pull.js
```

If you see ✅ lines and files appear in `.agent/data/`, you're done!

---

## 🔑 Getting Your Credentials

### Meta Ads (Facebook)

You need two things: an **Access Token** and your **Ad Account ID**.

**Ad Account ID:**
1. Go to [Meta Ads Manager](https://adsmanager.facebook.com/)
2. The URL will contain `act_XXXXXXXXX` — that's your Ad Account ID
3. Copy the full `act_XXXXXXXXX` value

**Access Token:**
1. Go to [Meta Developer Portal](https://developers.facebook.com/tools/explorer/)
2. Click "Generate Access Token"
3. Select permissions: `ads_read`, `ads_management`
4. Copy the token

> ⚠️ Access tokens expire after ~60 days. When the script stops working, just generate a new one.

---

### Google Analytics 4

You need a **Service Account** and your **Property ID**.

**Property ID:**
1. Open [GA4](https://analytics.google.com/)
2. Go to Admin (gear icon) → Property Settings
3. Copy the **Property ID** (a number like `158061179`)
4. Add `properties/` before it: e.g. `properties/158061179`

**Service Account (one-time setup):**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Enable the **Google Analytics Data API**
4. Go to IAM & Admin → Service Accounts → Create Service Account
5. Download the JSON key file
6. Save it as `.agent/scripts/ga4-credentials.json`
7. In GA4 Admin → Property Access Management → add the service account email as a **Viewer**

---

## 📁 Output Files

All CSV files are saved to `.agent/data/` with the date range in the filename:

| File | Contents |
|---|---|
| `meta_campaigns_*.csv` | Campaign/adset performance |
| `meta_by_country_*.csv` | Reach & spend by country |
| `meta_by_demographics_*.csv` | Reach & spend by age & gender |
| `ga4_traffic_*.csv` | Sessions by channel |
| `ga4_countries_*.csv` | Users by country & city |
| `ga4_landing_pages_*.csv` | Landing page performance |
| `ga4_events_*.csv` | Event counts |

---

## 🔄 Daily Use

Once set up, your routine is:

1. Open PowerShell
2. Run: `node "f:\New Alpaca Site\ZAPnew2\.agent\scripts\meta-ads-pull.js"`
3. Run: `node "f:\New Alpaca Site\ZAPnew2\.agent\scripts\ga4-pull.js"`
4. Tell your AI agent: **"analyse the latest ads data"**

Or use the slash command: `/meta-ads-review`
