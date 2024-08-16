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
          <button class="btn btn-success">Edit</button>
        </td>
        <td>
          <button class="btn btn-danger">Delete</button>
        </td>
      </tr>
    `;
    })
    .join('');

  return layout({
    content: `
    <div class="mt-5">
      <h1>Products</h1>
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
