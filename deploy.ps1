#!/usr/bin/env pwsh
# Deploy script to push bug fixes to GitHub/Vercel

Write-Host "============================================" -ForegroundColor Yellow
Write-Host "Oil Website - Deploy Bug Fixes to Vercel" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Yellow
Write-Host ""

Set-Location (Split-Path -Parent $MyInvocation.MyCommand.Path)

Write-Host "[1/4] Checking git status..." -ForegroundColor Cyan
git status
Write-Host ""

Write-Host "[2/4] Staging all changes..." -ForegroundColor Cyan
git add .
Write-Host "✓ Changes staged" -ForegroundColor Green
Write-Host ""

Write-Host "[3/4] Committing changes..." -ForegroundColor Cyan
git commit -m "Fix: Order tracking case-insensitive lookup and order history error handling"
Write-Host ""

Write-Host "[4/4] Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "✅ SUCCESS! Changes pushed to GitHub" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Vercel will deploy automatically in 1-2 minutes." -ForegroundColor Cyan
Write-Host "Visit: https://levioils.vercel.app/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Bug Fixes Deployed:" -ForegroundColor Green
Write-Host "  ✓ Order Tracking - Case-insensitive lookup" -ForegroundColor Green
Write-Host "  ✓ Order History - Email search & error handling" -ForegroundColor Green
