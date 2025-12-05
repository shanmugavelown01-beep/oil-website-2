# Complete E-Commerce Setup Guide - Levi Oils

## 🎯 System Overview

Your e-commerce system includes:
- **Frontend**: Product catalog, shopping cart, checkout (HTML/CSS/JS)
- **Backend**: Node.js/Express API for products, orders, invoices
- **Admin Panel**: Manage products, view orders, generate invoices
- **Billing System**: Invoice generation with print/download support

---

## 📋 Files Structure

```
oil website 2/
├── index.html                      # Main website
├── admin.html                       # Admin dashboard
├── order-success.html               # Order confirmation page
├── invoice-generator.js             # Client-side invoice generator
├── script.js                        # Frontend logic (API integration)
├── styles.css                       # Styles
├── README.md                        # Main documentation
├── server/
│   ├── index.js                     # Express server
│   ├── package.json                 # Dependencies
│   ├── .env.example                 # Environment variables template
│   ├── products.json                # Products database
│   ├── orders.json                  # Orders storage
│   └── invoices.json                # Invoices storage
└── ECOMMERCE_SETUP.md              # This file
```

---

## 🚀 Quick Start (Local Development)

### 1. **Prerequisites**
- Node.js 14+ (download from nodejs.org)
- A modern web browser
- Command line/terminal

### 2. **Install & Run Server**

```powershell
# Navigate to project folder
cd "path/to/oil website 2"

# Go to server folder
cd server

# Install dependencies
npm install

# Start server
npm start
```

Server will run on `http://localhost:3000`

### 3. **Access the Site**
- **Customer Site**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin.html

---

## 💳 Payment Integration (Stripe/PayPal)

### Stripe Setup (Recommended)

1. **Get Stripe Keys**:
   - Sign up at stripe.com
   - Go to Dashboard > API keys
   - Copy Secret Key (starts with `sk_test_`)

2. **Configure**:
   ```powershell
   cd server
   cp .env.example .env
   # Edit .env with your keys
   ```

3. **Update `.env`**:
   ```
   STRIPE_SECRET_KEY=sk_test_YOUR_KEY
   STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
   PORT=3000
   ```

4. **Restart Server**:
   ```powershell
   npm start
   ```

### PayPal Setup (Optional)

PayPal endpoint is provided as a placeholder. To implement:
1. Get PayPal Sandbox credentials
2. Install PayPal SDK: `npm install @paypal/checkout-server-sdk`
3. Update `server/index.js` `/api/create-paypal-order` endpoint with your integration

---

## 🛍️ Customer Features

### Shopping Flow
1. Browse products on main page
2. Click "Add to Cart"
3. Click cart icon (🛒) in top-right
4. Review items and proceed to checkout
5. Fill billing information
6. Select payment method
7. Place order

### After Order
- Order confirmation page displayed
- Invoice automatically generated
- Print or download invoice (print-to-PDF)
- Order details saved to server

---

## 🔧 Admin Dashboard Features

Access at: `http://localhost:3000/admin.html`

### **Products Tab**
- Add new products
- Edit existing products
- Delete products
- Prices update in real-time on customer site

### **Orders Tab**
- View all customer orders
- Customer details (name, email, address)
- Order totals and dates
- View invoice for each order

### **Invoices Tab**
- All generated invoices
- Print/download options
- Invoice details with itemization
- Tax and shipping breakdown

---

## 💰 Billing & Invoice System

### Features
- **Automatic Generation**: Invoice created after each order
- **Print Support**: Click "Print Invoice" to use browser print dialog
- **PDF Export**: Save as PDF via browser print-to-PDF feature
- **Professional Template**: Company info, customer details, itemization, totals
- **Payment Method Tracking**: Shows which payment method was used

### Customer Invoice Access
After checkout:
1. Confirmation page displayed
2. Click "View Invoice" button
3. Invoice opens in modal
4. Click "Print Invoice" to open print dialog
5. Save as PDF or print to physical printer

### Admin Invoice Management
1. Go to Admin Dashboard > Invoices tab
2. See all invoices with customer names and totals
3. Click "View" to see invoice details
4. Click "Print" to open print dialog

---

## 📊 Data Storage (Demo)

Current setup uses **file-based storage** (JSON files):
- `products.json` - Product catalog
- `orders.json` - Customer orders
- `invoices.json` - Generated invoices

**For Production**, replace with a database like:
- MongoDB
- PostgreSQL
- MySQL
- Firebase

---

## 🔐 Security Notes

### Current Demo State
- ✅ Works without HTTPS (local only)
- ⚠️ No database encryption
- ⚠️ Card data not encrypted (demo only)

### Production Requirements
- 🔒 Enable HTTPS/SSL
- 🔒 Never store card data (use Stripe/PayPal tokens)
- 🔒 Validate orders on server-side
- 🔒 Secure environment variables
- 🔒 Rate limiting on API endpoints
- 🔒 User authentication for admin

---

## 🐛 Troubleshooting

### "Cannot find module 'express'"
```powershell
cd server
npm install
```

### Server won't start on port 3000
- Change port in `server/.env`: `PORT=3001`
- Or: `netstat -ano | findstr :3000` to see what's using it

### Invoice not showing
- Make sure `invoice-generator.js` is in project root
- Check browser console (F12) for errors
- Clear browser cache (Ctrl+Shift+Delete)

### Admin panel shows no products
- Make sure server is running (`npm start`)
- Check `server/products.json` has valid JSON
- Try adding a product via admin form

### Orders not saving
- Verify `server/orders.json` exists and is valid JSON
- Check server console for error messages
- Restart server

---

## 📈 Customization Guide

### Change Company Info (for invoices)
Edit `invoice-generator.js`:
```javascript
this.company = {
  name: 'Your Company Name',
  email: 'your-email@example.com',
  phone: 'your-phone',
  address: 'Your Address'
}
```

### Adjust Tax Rate
Edit `script.js` (line ~280):
```javascript
tax: subtotalAmount * 0.15  // Change 0.1 to 0.15 for 15%
```

### Change Shipping Cost
Edit `script.js` (line ~282):
```javascript
shipping: 10.00  // Change from 5.00 to 10.00
```

### Customize Invoice Template
Edit `invoice-generator.js` `generateHTML()` method to modify:
- Colors
- Layout
- Font sizes
- Sections

---

## 🚢 Deployment

### Heroku (Free Tier)
```powershell
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create levi-oils-shop

# Push code
git push heroku main

# View logs
heroku logs --tail
```

### Netlify/Vercel (Frontend Only)
For static hosting without backend, use original files before server integration.

### VPS/Cloud Server
1. Install Node.js
2. Copy project folder
3. Run `npm install && npm start`
4. Use PM2 for process management: `npm install -g pm2`
5. Setup Nginx as reverse proxy

---

## 📞 Support

For issues or questions:
1. Check console errors (F12 in browser)
2. Check server logs (terminal running `npm start`)
3. Review troubleshooting section above
4. Refer to DOCUMENTATION.md for additional info

---

## 📝 Next Steps

1. ✅ Test locally with sample orders
2. ✅ Customize product catalog
3. ✅ Set up Stripe/PayPal keys
4. ✅ Add business info to invoices
5. ✅ Test checkout flow end-to-end
6. ✅ Deploy to production
7. ✅ Set up SSL certificate
8. ✅ Configure email notifications

---

**Version**: 2.0  
**Created**: December 2025  
**System**: Levi Oils E-Commerce Platform  
