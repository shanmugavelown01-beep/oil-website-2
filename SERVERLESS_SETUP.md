# Vercel Serverless Functions Setup (Option 2)

This guide covers setting up your Express API as Vercel serverless functions.

## Overview

Instead of running a persistent Express server, Vercel serverless functions execute each API call as an individual function invocation. This is:
- **More cost-effective** (free tier is generous)
- **Auto-scaling** (no server to manage)
- **All on Vercel** (no need for separate backend service)

## Architecture

```
api/
├── utils.js           ← Shared utilities (file I/O, CORS)
├── orders.js          ← GET/POST /api/orders
├── orders/
│   └── [id].js        ← GET /api/orders/:id (by order number)
```

## Key Files

### 1. `api/utils.js`
Shared functions for all serverless functions:
- `readOrders()` - Read orders.json from server directory
- `writeOrders()` - Write orders back to disk
- `handleCors()` - Setup CORS headers

### 2. `api/orders.js`
Handles both:
- `GET /api/orders` - Returns all orders
- `POST /api/orders` - Creates new order from checkout

### 3. `api/orders/[id].js`
- `GET /api/orders/:id` - Returns specific order by order number or ID
- Note: Dynamic route parameter uses `[id]` syntax for Vercel

## Important Notes

### File Persistence
- Serverless functions can read/write files in the deployment
- Functions have access to `server/` directory (one level up)
- Each function is stateless - data persists via JSON files

### CORS Headers
- All functions set CORS headers automatically
- Handles OPTIONS preflight requests

### Order Number Lookup
- Case-insensitive (supports ORD-*, ord-*, OrD-*, etc.)
- Also supports ID lookup as fallback

## How to Use This Setup

### Option 1: Use Railway (Recommended)
Skip this section - use `RAILWAY_DEPLOYMENT.md` instead.

### Option 2: Deploy to Vercel as Serverless

1. **Files already exist** - All `/api` files are ready
2. **Update `vercel.json`** - Configure for serverless:
   ```json
   {
     "functions": {
       "api/**/*.js": {
         "runtime": "nodejs18.x"
       }
     },
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "/api/$1"
       }
    ],
     "headers": [
       {
         "source": "/api/(.*)",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "no-cache"
           }
         ]
       }
     ]
   }
   ```

3. **Update `config.js`** - No changes needed (already handles Vercel)

4. **Deploy to Vercel**:
   ```bash
   git add api/ config.js vercel.json
   git commit -m "Add serverless functions for Vercel deployment"
   git push origin main
   ```

5. **Vercel will automatically**:
   - Detect serverless functions in `/api` directory
   - Build and deploy them
   - Create endpoints at your domain

### Test Deployment

After deploying to Vercel:

1. **Get your API URL**: `https://your-domain.vercel.app`

2. **Test order tracking**:
   ```bash
   curl https://your-domain.vercel.app/api/orders/ORD-1234567890
   ```

3. **Test all orders**:
   ```bash
   curl https://your-domain.vercel.app/api/orders
   ```

4. **Visit order history**: https://your-domain.vercel.app/order-history.html

## Advantages vs Railway

| Feature | Railway | Vercel Serverless |
|---------|---------|------------------|
| Setup Time | 5 mins | 2 mins (files exist) |
| Cost | Free tier | Free tier |
| Cold Starts | None | ~100ms (minor) |
| Scalability | Great | Excellent |
| Simplicity | Simple | Simple |
| Backend Running | Always | On-demand |

## Troubleshooting

### "Functions detected but not deploying"
- Check `/api` directory exists
- Verify `api/utils.js` and `api/orders.js` exist
- Run `git status` to ensure files are staged

### "Module not found: './utils'"
- Check `api/orders.js` has `require('./utils')`
- Ensure `api/utils.js` exists in same directory

### "Cannot read orders file"
- Vercel serverless functions run from project root
- `api/utils.js` uses `path.join(__dirname, '..', 'server')`
- This should correctly reference `server/orders.json`

### "CORS error in browser"
- Check `handleCors(req, res)` is called in every function
- Verify `setCorsHeaders(res)` sets proper headers

## Files Modified for Serverless

- `api/utils.js` - NEW: Shared utilities
- `api/orders.js` - NEW: GET/POST orders handler
- `api/orders/[id].js` - NEW: GET single order by ID
- `api/orders/create.js` - NEW: Alternative POST handler (optional)
- `config.js` - Already updated to auto-detect environment
- `vercel.json` - Should include serverless configuration
- `order-history.html` - Already uses CONFIG.apiUrl
- `order-tracking.html` - Already uses CONFIG.apiUrl

## Next Steps

1. Choose: Railway (easiest) or Vercel Serverless (all-Vercel)
2. If Railway: Follow `RAILWAY_DEPLOYMENT.md`
3. If Vercel Serverless: Update `vercel.json` and push to GitHub
4. Test order tracking and history on your live site
5. Done! 🎉

