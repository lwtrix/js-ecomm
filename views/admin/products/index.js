const layout = require('./../layout');

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
      <tr>
        <th scope="row">${product.id}</th>
        <td>${product.productName}</td>
        <td>${product.productPrice}</td>
        <td>
          <a class="btn btn-success" href="/admin/products/${product.id}/edit">Edit</a>
        </td>
        <td>
          <a class="btn btn-danger">Delete</a>
        </td>
      </tr>
    `;
    })
    .join('');

  return layout({
    content: `
    <div class="mt-5">
    <div class="d-flex justify-content-between align-items-center">
      <p class="h4">Products</p>
      <a class="btn btn-primary mt-2" href="/admin/products/add">Add Product</a>
    </div>
      <table class="table mt-4">
        <thead class="table-dark"
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedProducts}        
        </tbody>
      </table>

    </div>
    `,
  });
};
