const { formatDate } = require('../../lib/public');
const layout = require('./layout');

module.exports = ({ order }) => {
  const taxFee = 1.75
  const shipFee = 4.25

  const total = order.totalPrice + taxFee + shipFee

  const renderOrderDate = formatDate(order.date)

  const renderOrderItems = () => {
    return order.items.map(item => 
      `
        <div class="row order-item">
          <div class="col-2 d-flex justify-content-center">
            <img src="${item.image}"/>
          </div>
          <div class="col-6 d-flex align-items-center">
            <span class="fw-medium">${item.name}</span>
          </div>
          <div class="col-2 d-flex align-items-center justify-content-end">
            <span>Qty x${item.quantity}</span>
          </div>
          <div class="col-2 d-flex align-items-center justify-content-end">
            <span>£${item.quantity * item.itemPrice}</span>
          </div>
        </div>
      `
    ).join('')
  }

  return layout({
    content: `
    <div class="order-summary">
      <div>
        <a href="/" class="mb-2 d-block return-btn" >
          <i class="bi bi-arrow-return-left"></i> Return to shop
        </a>
        <div class="top-brand py-5 bg-light">
          <h3 class="text-center">Monk</h3>
        </div>
        <div>
          <h5 class="mt-5">Thank you for your order!</h5>
          <p class="mb-1 mt-4 fw-medium">Hello there,</p>
          <p>Your order has been confirmed and will be shipping soon :)</p>
        </div>
        <div class="row order-details mt-5">
          <div class="col-4 bg-light py-2">
            <p class="my-0">Order ID</p>
            <p class="my-0 mt-1 fw-semibold">#${order.id}</p>
          </div>
          <div class="col-4 bg-light py-2"> 
            <p class="my-0">Order Date</p>
            <p class="my-0 mt-1 fw-semibold">${renderOrderDate()}</p>
          </div>
          <div class="col-4 bg-light py-2">
            <p class="my-0">Payment</p>
            <p class="my-0 mt-1 fw-semibold">Visa -1159</p>
          </div>
        </div>
        <div class="order-items pe-2">
          ${renderOrderItems()}
        </div>
        <div class="order-calc px-2">
          <div class="d-flex justify-content-between pt-2">
            <span>Subtotal</span>
            <span>£${order.totalPrice}</span>
          </div>
          <div class="d-flex justify-content-between py-1">
            <span>Shipping Fee</span>
            <span>£${shipFee}</span>
          </div>
          <div class="d-flex justify-content-between pb-2">
            <span>Tax Fee</span>
            <span>£${taxFee}</span>
          </div>
        </div>
        <div class="order-total d-flex justify-content-between px-2 py-3">
          <span class="fw-semibold">Total</span>
          <span class="fw-semibold">£${total}</span>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  `,
  });
};
