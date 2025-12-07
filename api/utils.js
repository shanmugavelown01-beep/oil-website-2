// Serverless API utilities - shared functions for all endpoints
// This is needed because Vercel serverless functions run in /api directory

const fs = require('fs');
const path = require('path');

// Get the data directory - one level up from /api
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'server');

const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const INVOICES_FILE = path.join(DATA_DIR, 'invoices.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const BANK_DETAILS_FILE = path.join(DATA_DIR, 'bank-details.json');

function readOrders() {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
    }
    const raw = fs.readFileSync(ORDERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading orders:', err);
    return [];
  }
}

function writeOrders(list) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(list, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing orders:', err);
    return false;
  }
}

function readInvoices() {
  try {
    if (!fs.existsSync(INVOICES_FILE)) {
      fs.writeFileSync(INVOICES_FILE, JSON.stringify([]));
    }
    const raw = fs.readFileSync(INVOICES_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading invoices:', err);
    return [];
  }
}

function writeInvoices(list) {
  try {
    fs.writeFileSync(INVOICES_FILE, JSON.stringify(list, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing invoices:', err);
    return false;
  }
}

function readBankDetails() {
  try {
    if (!fs.existsSync(BANK_DETAILS_FILE)) {
      fs.writeFileSync(BANK_DETAILS_FILE, JSON.stringify([]));
    }
    const raw = fs.readFileSync(BANK_DETAILS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading bank details:', err);
    return [];
  }
}

function writeBankDetails(list) {
  try {
    fs.writeFileSync(BANK_DETAILS_FILE, JSON.stringify(list, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing bank details:', err);
    return false;
  }
}

function readProducts() {
  try {
    if (!fs.existsSync(PRODUCTS_FILE)) {
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([]));
    }
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading products:', err);
    return [];
  }
}

function writeProducts(list) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(list, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing products:', err);
    return false;
  }
}

// Setup CORS headers for serverless responses
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Handle preflight requests
function handleCors(req, res) {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

module.exports = {
  readOrders,
  writeOrders,
  readInvoices,
  writeInvoices,
  readBankDetails,
  writeBankDetails,
  readProducts,
  writeProducts,
  setCorsHeaders,
  handleCors,
  ORDERS_FILE,
  INVOICES_FILE,
  BANK_DETAILS_FILE,
  PRODUCTS_FILE
};
