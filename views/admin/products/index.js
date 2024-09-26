const layout = require('./../layout');

module.exports = ({ products }) => {
  const renderedProducts = products
    .map((product) => {
      return `
      <div class="product-row row my-1">
        <div class="col-1 d-flex align-items-center">
          <div class="img-container">
            <img src="${product.productImage}"/>
          </div>
        </div>
        <div class="col-8 d-flex align-items-center">${product.productName}</div>
        <div class="col-1 d-flex align-items-center">£${product.productPrice}</div>
        <div class="col-1 d-flex align-items-center">
          <a href="/admin/products/${product.id}/edit" class="icon-wrapper">
            <i class="bi bi-pen edit"></i>
          </a>
        </div>
        <div class="col-1 d-flex align-items-center">
        <form method="POST" action="/admin/products/${product.id}/delete">
          <div class="icon-wrapper" data-submit>
          <i class="bi bi-trash2-fill delete"></i>
          </div>
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
        <div class="d-flex justify-content-between align-items-center">
          <p class="h4">Products</p>
          <a class="button mt-2" href="/admin/products/add">
            <i class="bi bi-plus-circle-fill me-3" style="font-size: 16px"></i>
            <span>Add Product</span>
          </a>
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
