const layout = require('../layout');

module.exports = ({ items }) => {
  const renderTotalPrice = () => {
    return items.reduce((total, item) => {
      return total+= item.quantity * item.productPrice;
    }, 0)
  }

  const renderItems = () => {
    return items
      .map(
        (item) =>
          `
        <tr>
          <th scope="row">
            <img src="data:image/png;base64, ${
              item.productImage
            }" class="item-img">
          </th>
          <td>
            <div class="mt-3">
              <strong>${item.productName}</strong>
            </div>
          </td>
          <td>
            <div class="mt-3">
              £${item.productPrice * item.quantity}
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center mt-3">
              <form method="POST" action="/cart/${item.id}/increase">
                <button class="btn m-0 p-0 mx-1 arrow-btn">
                  <i class="bi bi-caret-left-fill"></i>
                </button>
              </form>  
              <span class="mx-2">${item.quantity}</span>
              <form method="POST" action="/cart/${item.id}/decrease">
                <button  class="btn m-0 p-0 mx-1" ${item.quantity < 2 ? 'disabled' : ''}>
                  <i class="bi bi-caret-right-fill"></i>
                </button>
              </form>
            </div>
          </td>
          <td>
            <form method="POST" action="/cart/${item.id}/delete" class="mt-3">
              <button class="btn btn-danger">Delete</button>
            </form>
          </td>
        </tr>
      `
      )
      .join('');
  };

  return layout({
    content: `
      <div class="cart">
        <div class="cart-items">
          <table class="table mt-4">
            <thead class="table-light">
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              ${renderItems()}
            </tbody>
          </table>

          <div class="cart-summary d-flex justify-content-between align-items-center mt-5">
            <div class="d-flex align-items-center ms-3">
              <p class="fs-2 m-0 p-0 fw-light">Total:</p>
              <p class="ms-4 fs-2 m-0 fw-semibold">£${renderTotalPrice()}</p>
            </div>
            <form action="/checkout" method="POST" class="me-3">
              <div data-submit class="button button-main">Checkout</div>
            </form>
          </div>
        </div>
      </div>
    `,
  });
};
