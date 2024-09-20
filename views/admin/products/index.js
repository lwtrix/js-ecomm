const layout = require('./../layout');

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
      <div class="product-row row my-1">
        <div class="col-1 d-flex align-items-center">
          <div class="img-container">
            <img src="data:image/png;base64, ${product.productImage}"/>
          </div>
        </div>
        <div class="col-8 d-flex align-items-center">${product.productName}</div>
        <div class="col-1 d-flex align-items-center">£${product.productPrice}</div>
        <div class="col-1 d-flex align-items-center">
          <a class="btn btn-success" href="/admin/products/${product.id}/edit">Edit</a>
        </div>
        <div class="col-1 d-flex align-items-center">
        <form method="POST" action="/admin/products/${product.id}/delete">
          <div class="btn btn-danger">Delete</div>
        </form>
        </div>
      </div>
    `;
    })
    .join('');

  return layout({
    page: 'products',
    content: `
    <div class="products-view">
      <div class="admin-view-wrapper">
        <div class="d-flex justify-content-between align-items-center" style="width: 95%">
          <p class="h4">Products</p>
          <a class="button mt-2" href="/admin/products/add">Add Product</a>
        </div>
        
        <div class="products-container d-flex flex-column justify-content-center">
          <div class="table-headings row">
            <div class="col-1">Image</div>
            <div class="col-8">Name</div>
            <div class="col-1">Price</div>
            <div class="col-1">Edit</div>
            <div class="col-1">Remove</div>
          </div>  
          ${renderedProducts}
        </div>
      </div>
    </div>
    `,
  });
};
