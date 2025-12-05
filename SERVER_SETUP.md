Server Setup (Local)

This project includes a minimal Express backend in `server/` to provide a products API and Stripe checkout session endpoint.

Steps:
1. Install Node.js 14+.
2. Copy env example: `cp server/.env.example server/.env` and fill in keys.
3. From project root, run:

```powershell
cd "server"
npm install
npm start
```

4. Open `http://localhost:3000` to use the site served by Express.

Notes:
- Stripe endpoint requires `STRIPE_SECRET_KEY` in `server/.env` (sandbox/test key).
- The server persists products to `server/products.json` (simple file-based storage). For production, replace with a database.
- PayPal endpoint is a placeholder. See `server/index.js` comments for integration hints.
