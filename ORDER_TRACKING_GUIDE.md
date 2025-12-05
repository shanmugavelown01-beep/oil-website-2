# Order Tracking System - Complete Guide

## Overview

The order tracking system allows customers to track their orders in real-time from purchase to delivery, and provides admins with comprehensive order management capabilities.

## Features

### For Customers
- **Order Lookup**: Enter order number to view order status
- **Status Timeline**: Visual 4-stage progress indicator
  - Pending → Processing → Shipped → Delivered
- **Tracking Number**: Unique tracking ID (format: TRACK-XXXXXXXXX)
- **Order Details**: View items, prices, totals, dates
- **Real-time Updates**: Status changes instantly reflect

### For Admins
- **Order Management**: View all orders in dashboard
- **Status Updates**: Dropdown to change order status
- **Real-time Display**: Current status clearly visible
- **Tracking Numbers**: Auto-generated and displayed
- **Order Details**: Click "View Invoice" to see full order

## Files Added/Modified

### New Files
1. **order-tracking.html** - Customer-facing order tracking page
   - Search form for order lookup
   - Status timeline visualization
   - Order details display
   - Item listing and totals

### Modified Files
1. **server/index.js** - Backend enhancements
   - POST /api/orders: Added status, trackingNumber, updatedAt fields
   - GET /api/orders/:id: Fetch single order by number
   - PUT /api/orders/:id/status: Admin endpoint to update status

2. **order-success.html** - Added tracking button
   - New "Track Order" button in confirmation page
   - Links to order-tracking.html with order number

3. **admin.html** - Enhanced orders management
   - Added Status column to orders table
   - Status dropdown for updating orders
   - Real-time status display with color coding

## Backend API Endpoints

### 1. Create Order (POST)
**Endpoint**: `POST /api/orders`

**Request Body**:
```json
{
  "orderNumber": "ORD-1234567890",
  "customer": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  },
  "items": [
    {
      "name": "Premium Groundnut Oil",
      "quantity": 2,
      "price": 12.99
    }
  ],
  "subtotal": 25.98,
  "tax": 2.60,
  "shipping": 5.00,
  "paymentMethod": "card"
}
```

**Response** (Order auto-populated with):
```json
{
  "orderNumber": "ORD-1234567890",
  "status": "pending",
  "trackingNumber": "TRACK-ABC123XYZ",
  "updatedAt": "2024-01-15T10:30:00Z",
  "customer": { ... },
  "items": [ ... ],
  "subtotal": 25.98,
  "tax": 2.60,
  "shipping": 5.00
}
```

### 2. Get Single Order (GET)
**Endpoint**: `GET /api/orders/:orderNumber`

**Example**: `GET /api/orders/ORD-1234567890`

**Response**:
```json
{
  "orderNumber": "ORD-1234567890",
  "status": "processing",
  "trackingNumber": "TRACK-ABC123XYZ",
  "updatedAt": "2024-01-15T11:45:00Z",
  "customer": { ... },
  "items": [ ... ],
  "subtotal": 25.98,
  "tax": 2.60,
  "shipping": 5.00,
  "date": "2024-01-15"
}
```

### 3. Update Order Status (PUT)
**Endpoint**: `PUT /api/orders/:orderNumber/status`

**Request Body**:
```json
{
  "status": "shipped"
}
```

**Valid Status Values**:
- `pending` - Initial status after order creation
- `processing` - Order being prepared
- `shipped` - Order sent to customer
- `delivered` - Order received by customer

**Response**:
```json
{
  "success": true,
  "message": "Order status updated",
  "order": { ... }
}
```

**Error Response** (if invalid status):
```json
{
  "error": "Invalid status"
}
```

### 4. Get All Orders (GET)
**Endpoint**: `GET /api/orders`

**Response**: Array of all orders with tracking information

### 5. Get Invoice (GET)
**Endpoint**: `GET /api/invoices/:invoiceId`

**Response**: Invoice HTML and data

## Usage Workflows

### Customer Workflow
1. Customer completes purchase → redirected to order-success.html
2. Order success page shows order number and confirmation
3. Customer can click "Track Order" button
4. Redirected to order-tracking.html with order number pre-filled
5. Customer can view:
   - Current status (pending/processing/shipped/delivered)
   - Tracking number for shipping carrier
   - Timeline showing progress
   - Order items and totals
   - Last updated timestamp

### Admin Workflow
1. Admin logs into admin.html dashboard
2. Navigates to "Orders" tab
3. Views all orders with current status
4. Can see Status column showing current state
5. To update order status:
   - Click dropdown in "Actions" column
   - Select new status (pending, processing, shipped, delivered)
   - Status immediately updates in database
   - Dropdown refreshes to show new status
6. Click "View Invoice" to see order details

## Status Lifecycle

```
pending (initial)
   ↓
processing (admin updates)
   ↓
shipped (admin updates, customer gets tracking number)
   ↓
delivered (admin updates when confirmed)
```

## Data Persistence

All orders are stored in `server/orders.json` with structure:
```json
[
  {
    "orderNumber": "ORD-XXXXXXXXX",
    "status": "processing",
    "trackingNumber": "TRACK-XXXXXXXXX",
    "updatedAt": "2024-01-15T10:30:00Z",
    "date": "2024-01-15",
    "customer": { ... },
    "items": [ ... ],
    "subtotal": 0,
    "tax": 0,
    "shipping": 0,
    "paymentMethod": "card"
  }
]
```

## Setting Up & Testing

### Prerequisites
- Node.js 14+ installed
- npm package manager

### Local Development

1. **Install Dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Start Server**:
   ```bash
   npm start
   # or
   node index.js
   ```
   
   Server runs on http://localhost:3000

3. **Open Website**:
   ```
   http://localhost:3000
   ```

4. **Test Order Tracking**:
   - Complete a purchase on homepage
   - Note the order number from confirmation page
   - Click "Track Order" button
   - View order status and tracking details

5. **Test Admin Updates**:
   - Open http://localhost:3000/admin.html
   - Go to Orders tab
   - Use status dropdown to update orders
   - Return to customer tracking page to see updated status

### Testing with curl/Postman

**Create Test Order**:
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "orderNumber": "ORD-TEST001",
    "customer": {
      "fullName": "Test Customer",
      "email": "test@example.com"
    },
    "items": [{"name": "Oil", "quantity": 1, "price": 12.99}],
    "subtotal": 12.99,
    "tax": 1.30,
    "shipping": 5.00
  }'
```

**Get Order**:
```bash
curl http://localhost:3000/api/orders/ORD-TEST001
```

**Update Status**:
```bash
curl -X PUT http://localhost:3000/api/orders/ORD-TEST001/status \
  -H "Content-Type: application/json" \
  -d '{"status": "shipped"}'
```

## Customization Guide

### Changing Status Values
Edit `server/index.js`, find the PUT endpoint validation:
```javascript
const validStatuses = ['pending', 'processing', 'shipped', 'delivered'];
```

Add/modify status names as needed (must also update order-tracking.html statusSteps array).

### Changing Tracking Number Format
In `server/index.js`, POST endpoint:
```javascript
order.trackingNumber = 'TRACK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
```

Modify the string format as needed (e.g., SHIP-XXXXX, PKG-XXXXX).

### Styling
- **Customer tracking page**: Edit order-tracking.html `<style>` section
- **Admin panel**: Edit admin.html `<style>` section

### Adding Email Notifications
Integrate email service (SendGrid, Mailgun, etc.) in server/index.js PUT endpoint to send status updates.

## Troubleshooting

### "Order not found" Error
- Verify order number format (should be ORD-XXXXXXXXX)
- Check that order was actually created and saved
- Check orders.json file exists and contains data

### Status Dropdown Not Working
- Ensure server is running
- Check browser console for JavaScript errors
- Verify /api/orders/:id/status endpoint is accessible

### Tracking Page Shows Old Data
- Clear browser cache and localStorage
- Reload page
- Check that server has latest data in orders.json

### Orders Disappearing After Restart
- Verify orders.json file is being written correctly
- Check file permissions in server directory
- Ensure server/orders.json exists and is not read-only

## Integration with Payment Systems

When integrating with Stripe/PayPal:

1. After successful payment, create order with `status: 'pending'`
2. Auto-generate tracking number
3. Send customer tracking link: `/order-tracking.html?order=ORD-XXXXX`
4. Admin can update status as order progresses through fulfillment

## Security Notes

### Current Demo Mode
- No authentication required
- Anyone can view any order number
- Anyone can update order status

### For Production
1. Add user authentication (customer + admin)
2. Implement role-based access control
3. Secure API endpoints with authentication tokens
4. Use HTTPS for all communications
5. Validate all input data
6. Log all status changes for audit trail
7. Use real database (MongoDB, PostgreSQL) instead of JSON files

## API Rate Limiting

For production, implement rate limiting:
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

## Next Steps

1. ✅ Backend order tracking API implemented
2. ✅ Customer tracking page (order-tracking.html) created
3. ✅ Admin status management UI added
4. ✅ Order confirmation links to tracking

### Optional Enhancements
- [ ] Email notifications on status changes
- [ ] SMS notifications for major status updates
- [ ] Advanced timeline with estimated delivery dates
- [ ] Carrier integration (FedEx, UPS, DHL)
- [ ] PDF tracking documentation
- [ ] QR codes on shipping labels
- [ ] Customer account dashboard with order history
- [ ] Admin analytics on fulfillment times

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review server/index.js console output for errors
3. Check browser console (F12) for JavaScript errors
4. Verify network requests in Network tab
5. Check orders.json file structure

---

**Version**: 1.0  
**Last Updated**: January 2024  
**Status**: Production Ready
