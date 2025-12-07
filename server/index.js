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
const INVOICES_FILE = path.join(__dirname, 'invoices.json');
const ORDERS_FILE = path.join(__dirname, 'orders.json');
const BANK_DETAILS_FILE = path.join(__dirname, 'bank-details.json');

// Ensure invoice, orders, and bank details files exist
if (!fs.existsSync(INVOICES_FILE)) fs.writeFileSync(INVOICES_FILE, JSON.stringify([]));
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
if (!fs.existsSync(BANK_DETAILS_FILE)) fs.writeFileSync(BANK_DETAILS_FILE, JSON.stringify([]));

function readProducts() {
  const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  return JSON.parse(raw);
}

function writeProducts(list) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(list, null, 2));
}

function readInvoices() {
  const raw = fs.readFileSync(INVOICES_FILE, 'utf8');
  return JSON.parse(raw);
}

function writeInvoices(list) {
  fs.writeFileSync(INVOICES_FILE, JSON.stringify(list, null, 2));
}

function readOrders() {
  const raw = fs.readFileSync(ORDERS_FILE, 'utf8');
  return JSON.parse(raw);
}

function writeOrders(list) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(list, null, 2));
}

function readBankDetails() {
  const raw = fs.readFileSync(BANK_DETAILS_FILE, 'utf8');
  return JSON.parse(raw);
}

function writeBankDetails(list) {
  fs.writeFileSync(BANK_DETAILS_FILE, JSON.stringify(list, null, 2));
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
  res.status(501).json({ error: 'PayPal endpoint not implemented in this demo. See README for integration steps.' });
});

app.post('/api/create-upi-order', (req, res) => {
  try {
    const { upiId, amount, orderId } = req.body;
    if (!upiId || !amount || !orderId) {
      return res.status(400).json({ error: 'Missing required fields: upiId, amount, orderId' });
    }
    const transactionRef = 'UPI-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    res.json({
      success: true,
      message: 'UPI payment initiated',
      transactionRef: transactionRef,
      upiId: upiId,
      amount: amount,
      orderId: orderId,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'UPI payment creation failed' });
  }
});

app.post('/api/create-gpay-order', (req, res) => {
  try {
    const { phoneNumber, amount, orderId } = req.body;
    if (!phoneNumber || !amount || !orderId) {
      return res.status(400).json({ error: 'Missing required fields: phoneNumber, amount, orderId' });
    }
    const transactionRef = 'GPAY-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    res.json({
      success: true,
      message: 'Google Pay payment initiated',
      transactionRef: transactionRef,
      phoneNumber: phoneNumber,
      amount: amount,
      orderId: orderId,
      redirectUrl: '/payment-gateway?transactionRef=' + transactionRef,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Google Pay payment creation failed' });
  }
});

app.post('/api/orders', (req, res) => {
  const order = req.body;
  order.orderNumber = 'ORD-' + Date.now();
  order.date = new Date().toISOString();
  order.status = 'pending';
  order.trackingNumber = 'TRACK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  order.updatedAt = new Date().toISOString();
  console.log('Order received:', order);
  try {
    const orders = readOrders();
    orders.push(order);
    writeOrders(orders);
  } catch (err) {
    console.warn('Could not persist order:', err);
  }
  res.status(201).json(order);
});

app.get('/api/orders/:id', (req, res) => {
  try {
    const orders = readOrders();
    const searchId = req.params.id.toUpperCase();
    const order = orders.find(o => (o.orderNumber && o.orderNumber.toUpperCase() === searchId) || o.id === req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Could not read order' });
  }
});

app.put('/api/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const orders = readOrders();
    const idx = orders.findIndex(o => o.orderNumber === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Order not found' });
    orders[idx].status = status;
    orders[idx].updatedAt = new Date().toISOString();
    if (status === 'shipped' && !orders[idx].trackingNumber) {
      orders[idx].trackingNumber = 'TRACK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
    writeOrders(orders);
    res.json(orders[idx]);
  } catch (err) {
    res.status(500).json({ error: 'Could not update order status' });
  }
});

app.post('/api/invoices', (req, res) => {
  try {
    const invoice = req.body;
    invoice.id = 'INV-' + Date.now();
    invoice.createdAt = new Date().toISOString();
    const invoices = readInvoices();
    invoices.push(invoice);
    writeInvoices(invoices);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: 'Could not save invoice' });
  }
});

app.get('/api/invoices', (req, res) => {
  try {
    const invoices = readInvoices();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Could not read invoices' });
  }
});

app.get('/api/invoices/:id', (req, res) => {
  try {
    const invoices = readInvoices();
    const invoice = invoices.find(i => i.id === req.params.id);
    if (!invoice) return res.status(404).json({ error: 'Invoice not found' });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: 'Could not read invoice' });
  }
});

app.get('/api/orders', (req, res) => {
  try {
    const orders = readOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Could not read orders' });
  }
});

// Bank Details API - Admin manages receiving bank accounts
app.get('/api/bank-details', (req, res) => {
  try {
    const bankDetails = readBankDetails();
    res.json(bankDetails);
  } catch (err) {
    res.status(500).json({ error: 'Could not read bank details' });
  }
});

app.post('/api/bank-details', (req, res) => {
  try {
    const bankDetails = readBankDetails();
    const newDetail = {
      id: 'BD-' + Date.now(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    bankDetails.push(newDetail);
    writeBankDetails(bankDetails);
    res.status(201).json(newDetail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save bank details' });
  }
});

app.delete('/api/bank-details/:id', (req, res) => {
  try {
    let bankDetails = readBankDetails();
    bankDetails = bankDetails.filter(bd => bd.id !== req.params.id && bd.accountNumber !== req.params.id);
    writeBankDetails(bankDetails);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not delete bank details' });
  }
});

const port = process.env.PORT || 3000;
const server = app.listen(port, 'localhost', () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log('Routes initialized');
});

server.on('error', (err) => {
  console.error('Server error:', err.message);
});

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
