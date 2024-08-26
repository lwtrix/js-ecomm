const layout = require('../layout');

module.exports = ({ items }) => {
  const renderedItems = () => {
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
          <td><strong>${item.productName}</strong></td>
          <td>£${item.productPrice * item.quantity}</td>
          <td>
            <div class="d-flex align-items-center">
              <form method="POST" action="/cart/${item.id}/increase">
                <button class="btn">
                  <i class="bi bi-caret-left-fill"></i>
                </button>
              </form>  
              <span class="mx-2">${item.quantity}</span>
              <form method="POST" action="/cart/${item.id}/decrease">
                <button  class="btn" ${item.quantity < 2 ? 'disabled' : ''}>
                  <i class="bi bi-caret-right-fill"></i>
                </button>
              </form>
            </div>
          </td>
          <td>
          <form method="POST" action="/cart/${item.id}/delete">
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
              ${renderedItems()}
            </tbody>
          </table>
        </div>
      </div>
    `,
  });
};
