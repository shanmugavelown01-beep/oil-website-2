require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PRODUCTS_FILE = path.join(__dirname, 'products.json');

function readProducts() {
  const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  return JSON.parse(raw);
}

function writeProducts(list) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(list, null, 2));
}

// Serve frontend static files from project root
app.use(express.static(path.resolve(__dirname, '..')));

// Products API
app.get('/api/products', (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Could not read products' });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const products = readProducts();
    const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const product = { id: nextId, ...req.body };
    products.push(product);
    writeProducts(products);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Could not save product' });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const id = parseInt(req.params.id, 10);
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Product not found' });
    products[idx] = { ...products[idx], ...req.body };
    writeProducts(products);
    res.json(products[idx]);
  } catch (err) {
    res.status(500).json({ error: 'Could not update product' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const products = readProducts();
    const id = parseInt(req.params.id, 10);
    const filtered = products.filter(p => p.id !== id);
    writeProducts(filtered);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete product' });
  }
});

// Payment endpoints
const stripeSecret = process.env.STRIPE_SECRET_KEY;
let stripe = null;
if (stripeSecret) {
  stripe = require('stripe')(stripeSecret);
}

app.post('/api/create-checkout-session', async (req, res) => {
  if (!stripe) return res.status(501).json({ error: 'Stripe not configured. Set STRIPE_SECRET_KEY in .env' });
  try {
    const { items, successUrl, cancelUrl } = req.body;
    const line_items = items.map(i => ({
      price_data: {
        currency: 'usd',
        product_data: { name: i.name },
        unit_amount: Math.round(i.price * 100)
      },
      quantity: i.quantity
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: successUrl || `${req.protocol}://${req.get('host')}/order-success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.protocol}://${req.get('host')}/`,
    });
    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
});

app.post('/api/create-paypal-order', async (req, res) => {
  // Placeholder: implement PayPal server-side order creation using REST SDK
  // Return approval URL to redirect the user to PayPal for approval.
  res.status(501).json({ error: 'PayPal endpoint not implemented in this demo. See README for integration steps.' });
});

// Simple orders endpoint (store minimal info) - this demo just echoes order and doesn't persist
app.post('/api/orders', (req, res) => {
  const order = req.body;
  order.orderNumber = 'ORD-' + Date.now();
  order.date = new Date().toISOString();
  // In production: persist to DB, send email, process payment verification
  console.log('Order received:', order);
  res.status(201).json(order);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
