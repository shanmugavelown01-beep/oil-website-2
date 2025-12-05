// Invoice Generator - generates HTML invoices for customers and admins
// Supports print and download (via print-to-PDF in browser)

class InvoiceGenerator {
  constructor(order, company = {}) {
    this.order = order;
    this.company = {
      name: company.name || 'Levi Oils',
      email: company.email || 'shanmugavelown01@gmail.com',
      phone: company.phone || '8680036354',
      address: company.address || 'Premium Cooking Oils',
      ...company
    };
  }

  generateHTML() {
    const { order, company } = this;
    const items = order.items || [];
    const subtotal = order.subtotal || 0;
    const tax = order.tax || 0;
    const shipping = order.shipping || 0;
    const total = subtotal + tax + shipping;

    const itemsHTML = items.map((item, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${(item.quantity * item.price).toFixed(2)}</td>
      </tr>
    `).join('');

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Invoice ${order.orderNumber}</title>
      <style>
        * { margin: 0; padding: 0; }
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .invoice-container { max-width: 900px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; }
        .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 3px solid #2d5016; padding-bottom: 20px; }
        .company-info h1 { color: #2d5016; margin-bottom: 5px; }
        .company-info p { font-size: 0.9em; color: #666; }
        .invoice-details { text-align: right; }
        .invoice-details p { margin: 5px 0; }
        .invoice-number { font-size: 1.2em; font-weight: bold; color: #2d5016; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th { background: #2d5016; color: white; padding: 10px; text-align: left; font-weight: bold; }
        td { padding: 10px; border-bottom: 1px solid #eee; }
        tr:hover { background: #f9f9f9; }
        .totals { width: 50%; margin-left: auto; }
        .totals-row { display: flex; justify-content: space-between; padding: 8px 0; }
        .totals-row.total { font-size: 1.2em; font-weight: bold; border-top: 2px solid #2d5016; border-bottom: 2px solid #2d5016; background: #f0f8f0; }
        .customer-info { background: #f9f9f9; padding: 15px; margin-bottom: 30px; border-left: 4px solid #d4a574; }
        .customer-info h3 { color: #2d5016; margin-bottom: 10px; }
        .customer-info p { margin: 5px 0; font-size: 0.95em; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 0.9em; }
        .actions { text-align: center; margin: 20px 0; gap: 10px; }
        .actions button { padding: 10px 20px; background: #2d5016; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1em; }
        .actions button:hover { background: #4a7c2c; }
        @media print { 
          .actions { display: none; }
          body { margin: 0; padding: 0; }
          .invoice-container { border: none; box-shadow: none; }
        }
      </style>
    </head>
    <body>
      <div class="invoice-container">
        <div class="header">
          <div class="company-info">
            <h1>${company.name}</h1>
            <p>Email: ${company.email}</p>
            <p>Phone: ${company.phone}</p>
            <p>${company.address}</p>
          </div>
          <div class="invoice-details">
            <p class="invoice-number">Invoice #${order.orderNumber}</p>
            <p><strong>Date:</strong> ${order.date}</p>
            <p><strong>Status:</strong> <span style="color: #4a7c2c; font-weight: bold;">Completed</span></p>
          </div>
        </div>

        <div class="customer-info">
          <h3>Bill To:</h3>
          <p><strong>${order.customer.fullName}</strong></p>
          <p>${order.customer.address}</p>
          <p>${order.customer.city}, ${order.customer.state} ${order.customer.zip}, ${order.customer.country}</p>
          <p>Email: ${order.customer.email}</p>
          <p>Phone: ${order.customer.phone}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="totals">
          <div class="totals-row">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div class="totals-row">
            <span>Tax (10%):</span>
            <span>$${tax.toFixed(2)}</span>
          </div>
          <div class="totals-row">
            <span>Shipping:</span>
            <span>$${shipping.toFixed(2)}</span>
          </div>
          <div class="totals-row total">
            <span>Total Amount:</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>

        <div class="footer">
          <p>Thank you for your order! Payment method: ${order.paymentMethod}</p>
          <p>&copy; ${new Date().getFullYear()} ${company.name}. All rights reserved.</p>
        </div>
      </div>

      <div class="actions">
        <button onclick="window.print()">🖨️ Print Invoice</button>
        <button onclick="downloadPDF('${order.orderNumber}')">⬇️ Download as PDF</button>
        <button onclick="window.close()">✕ Close</button>
      </div>

      <script>
        function downloadPDF(orderNum) {
          alert('PDF download: use browser print dialog (Ctrl+P / Cmd+P) and save as PDF');
        }
      </script>
    </body>
    </html>
    `;
    return html;
  }

  // Display invoice in a modal/popup
  displayInModal() {
    const html = this.generateHTML();
    const newWindow = window.open();
    newWindow.document.write(html);
    newWindow.document.close();
    return newWindow;
  }

  // Display invoice in a specific DOM element
  displayInElement(elementId) {
    const html = this.generateHTML();
    const el = document.getElementById(elementId);
    if (el) {
      el.innerHTML = html;
    }
  }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InvoiceGenerator;
}
