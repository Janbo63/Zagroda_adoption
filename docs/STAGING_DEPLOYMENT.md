# Staging Deployment Guide (VPS)

Follow these steps to get your new website running on your VPS for testing.

## 1. Prepare Your GitHub Repository
1. Go to [GitHub](https://github.com/new) and create a **Private** repository (e.g., `ZAP-V2-Staging`).
2. Copy the URL of your new repository.

## 2. Push Code from Local Machine
First, ensure your terminal is in the project folder. Run these commands in your PowerShell:
```powershell
f:
cd "f:\New Alpaca Site\ZAPnew2"
```

Then, run **one** of the following:
```powershell
./scripts/prepare-staging.ps1
```

**For Git Bash / Linux / Mac:**
```bash
./scripts/prepare-staging.sh
```
Follow the prompts and paste your GitHub repository URL when asked.

## 3. VPS Initial Setup
Log into your VPS via SSH and install Docker (if not already installed). 

### For Ubuntu:
```bash
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl enable --now docker
```

## 4. Deploy the Website
Run these commands on your VPS:
```bash
# Clone the new repository
git clone [YOUR_NEW_REPO_URL]
cd [YOUR_REPO_NAME]

# Build and start the website
docker-compose up --build -d
```

## 5. Environment Variables
You will need to manually create a `.env` file on your VPS to store your Stripe keys:
```bash
nano .env
```
Paste your keys:
```text
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```
Press `Ctrl+O`, `Enter`, then `Ctrl+X` to save.

## 6. Access Your Site
The site will be available on port `3000` of your VPS IP address (e.g., `http://[VPS_IP]:3000`).
