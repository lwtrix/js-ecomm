const { formatDate } = require('../../../lib/public');
const layout = require('../layout');

module.exports = ({ orders }) => {
  const renderedOrders = orders
    .map((order) => {
      const totalItems = order.items.reduce((total, current) => {
        return total += current.quantity
      }, 0)

      return `<div class="order-row row my-1">
        <div class="col-2 d-flex align-items-center">${order.id}</div>
        <div class="col-6 d-flex align-items-center">${formatDate(order.date)}</div>
        <div class="col-2 d-flex align-items-center">${order.totalPrice}</div>
        <div class="col-2 d-flex align-items-center">${totalItems}</div>
      </div>`;
    })
    .join('');

  return layout({
    page: 'orders',
    content: `
      <div class="orders-view">
        <div class="admin-view-wrapper">
          <div class="top">
            <p class="h3">Orders</p>
          </div>  

          <div class="orders-container d-flex flex-column">
            <div class="table-headings row">
              <div class="col-2">Order ID</div>
              <div class="col-6">Date</div>
              <div class="col-2">Total</div>
              <div class="col-2">Items</div>
            </div>
            ${renderedOrders} 
          </div>
        </div>
      </div>
  `,
  });
};
