// Serverless function: POST /api/orders
// Creates a new order from checkout
// In Vercel, this handles both GET and POST on the same route

const { readOrders, writeOrders, handleCors } = require('../utils');

module.exports = (req, res) => {
  if (handleCors(req, res)) return;

  if (req.method === 'GET') {
    // Return all orders
    try {
      const orders = readOrders();
      res.status(200).json(orders);
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'Could not read orders' });
    }
    return;
  }

  if (req.method === 'POST') {
    // Create new order
    try {
      const order = req.body;
      order.id = Date.now().toString();
      order.orderNumber = 'ORD-' + Date.now();
      order.date = new Date().toISOString();
      order.status = 'pending';
      order.trackingNumber = 'TRACK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      order.updatedAt = new Date().toISOString();
      
      console.log('Order received:', order);

      const orders = readOrders();
      orders.push(order);
      writeOrders(orders);

      res.status(201).json(order);
    } catch (err) {
      console.error('Error creating order:', err);
      res.status(500).json({ error: 'Could not create order' });
    }
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
};
