# 🚀 Deployment Guide - Levi Oils Website

This guide covers deploying your website with two options:
- **Option 1: Railway** (Recommended - Simplest setup)
- **Option 2: Vercel Serverless** (Alternative - if you prefer all-Vercel)

---

## Option 1: Railway Deployment (Recommended)

### What is Railway?
Railway is a modern platform that makes it easy to deploy Node.js applications. It's perfect for your Express backend.

### Step 1: Create Railway Account
1. Go to **https://railway.app**
2. Click "Start Project"
3. Sign in with GitHub (recommended) or create account
4. Grant Railway access to your GitHub repositories

### Step 2: Deploy Your Backend to Railway
1. From Railway dashboard, click "New Project"
2. Select "Deploy from GitHub"
3. Find and select `oil-website-2` repository
4. Select `server` as the root directory (important!)
5. Railway will auto-detect it's a Node.js project
6. Click "Deploy"

Railway will automatically:
- Install dependencies from `server/package.json`
- Run `npm start` to start your Express server
- Assign a public URL (e.g., `https://oil-website-backend.railway.app`)

### Step 3: Get Your Railway API URL
1. Go to your Railway project dashboard
2. Click the "Deployments" tab
3. Find the "Service Domain" - this is your API URL
4. Copy it (looks like: `https://oil-website-backend.railway.app`)

### Step 4: Update Frontend with Railway URL
1. Open `config.js` in your project
2. Update the fallback API URL:
   ```javascript
   const railwayUrl = 'https://YOUR-RAILWAY-URL'; // Replace with your Railway domain
   ```

### Step 5: Commit and Push Changes
```bash
git add config.js
git commit -m "Update config with Railway API URL"
git push origin main
```

### Step 6: Deploy Frontend to Vercel
Your Vercel deployment will automatically redeploy when you push to GitHub.

### Step 7: Test Everything
1. Go to https://levioils.vercel.app
2. Try order tracking - should work!
3. Try order history - should work!
4. Check browser console (F12) for any errors

---

## Option 2: Vercel Serverless (Backup)

If you prefer not to use Railway, you can convert your Express routes into Vercel serverless functions.

### What You Need
- Vercel serverless functions run each endpoint separately
- No persistent process needed
- Files stored in `/api` directory

### Setup Instructions
The serverless function files are in `/api` directory. Each file handles one endpoint:

**Create these files:**

1. `api/orders.js` - GET /api/orders (all orders)
2. `api/orders/[id].js` - GET /api/orders/:id (single order)
3. Other endpoints as needed

These are already prepared. You just need to:
1. Ensure they exist in your project
2. Push to GitHub
3. Vercel will automatically deploy as serverless functions

---

## Environment Variables (Optional)

### For Railway
No environment variables needed - your backend runs as a normal Node.js app.

### For Vercel Frontend
Add this environment variable in Vercel dashboard:
- **Name**: `NEXT_PUBLIC_API_URL`
- **Value**: Your Railway or external API URL
- **Note**: Won't be needed if using Vercel serverless functions

---

## Troubleshooting

### "Server error 404" on Order History
**Problem**: Frontend can't reach backend API
**Solution**: 
1. Check Railway deployment URL is correct
2. Verify config.js has the right API URL
3. Check browser console (F12) for fetch errors

### "Unable to connect to server"
**Problem**: Network or CORS issue
**Solution**:
1. Verify Railway backend is running (check Railway dashboard)
2. Confirm CORS is enabled on Express server (it is)
3. Check your internet connection

### "All orders loading but not filtering by email"
**Problem**: Backend logic issue
**Solution**:
1. Restart Railway deployment (Force Redeploy button)
2. Check server/index.js has email filtering code

---

## Quick Reference

### Local Development
```bash
# Terminal 1: Start backend
cd server
npm start
# Runs on http://localhost:3000

# Terminal 2: Open frontend
# Open index.html in browser
# config.js will automatically use localhost:3000
```

### Production
- **Frontend**: Hosted on Vercel (auto-deploys from GitHub)
- **Backend**: Hosted on Railway (runs Express server)
- **Config**: config.js automatically detects environment and uses correct API URL

---

## Files Modified for Deployment

- `config.js` - Environment-aware API URL configuration (NEW)
- `order-history.html` - Uses CONFIG.apiUrl instead of window.location.origin
- `order-tracking.html` - Uses CONFIG.apiUrl instead of window.location.origin
- `vercel.json` - Vercel build configuration
- `package.json` - Root package.json (for Vercel)
- `.railwayignore` - Tells Railway which files to ignore

---

## Next Steps

1. **Choose your deployment**: Railway (recommended) or Vercel Serverless
2. **Set up the platform**: Follow the steps above
3. **Test everything**: Order tracking and history should work
4. **Share your link**: https://levioils.vercel.app is now production-ready!

Good luck! 🎉
