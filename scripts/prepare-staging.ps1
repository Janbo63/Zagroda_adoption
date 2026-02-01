# PowerShell Deployment Helper Script for Alpaca Farm Website

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Alpaca Farm Deployment Prep Tool (PS)" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

# 1. Ask for the new repository URL
$repoUrl = Read-Host "Enter your NEW GitHub repository URL (e.g., https://github.com/your-username/your-repo.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "Error: No repository URL provided." -ForegroundColor Red
    exit
}

# 2. Check current remotes
Write-Host "--- Checking current Git remotes ---" -ForegroundColor Yellow
git remote -v

# 3. Rename old origin to 'legacy' to keep it as a backup
Write-Host "--- Renaming old 'origin' to 'legacy' ---" -ForegroundColor Yellow
try {
    git remote rename origin legacy
} catch {
    Write-Host "Info: 'origin' not found or already renamed, skipping."
}

# 4. Add the new repository as the new 'origin'
Write-Host "--- Adding new remote as 'origin' ---" -ForegroundColor Yellow
git remote add origin $repoUrl

# 5. Push the code to the new repository
Write-Host "--- Pushing code to the new repository ---" -ForegroundColor Yellow
git add .
git commit -m "chore: prepare for staging deployment"
git push -u origin main

Write-Host "============================================" -ForegroundColor Green
Write-Host " SUCCESS! Your code is now in the new repo." -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host "Next steps on your VPS:"
Write-Host "1. git clone $repoUrl"
Write-Host "2. cd into the folder"
Write-Host "3. Run: docker-compose up --build -d"
Write-Host "============================================"
