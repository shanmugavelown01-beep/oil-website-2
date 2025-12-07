// Serverless function: GET /api/orders/[id]
// Returns a specific order by order number or ID
// Note: In Vercel serverless, dynamic routes use [id].js naming

const { readOrders, handleCors } = require('../utils');

module.exports = (req, res) => {
  if (handleCors(req, res)) return;

  const { id } = req.query;

  if (!id) {
    res.status(400).json({ error: 'Order ID required' });
    return;
  }

  try {
    const orders = readOrders();
    const searchId = id.toUpperCase();
    const order = orders.find(
      o => (o.orderNumber && o.orderNumber.toUpperCase() === searchId) || o.id === id
    );

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    res.status(200).json(order);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Could not read order' });
  }
};
