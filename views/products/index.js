const layout = require('./layout');

module.exports = ({ products }) => {
  const renderProducts = () => {
    return products
      .map(
        (product) =>
          `<div class="card">
            <img src="data:image/png;base64, ${product.productImage}" class="card-img-top img-fluid">
            <div class="card-body">
              <h5 class="card-title">${product.productName}</h5>
              <p class="card-text">£${product.productPrice}</p>
              <form method="POST" action="/cart/${product.id}">
                <button class="btn btn-primary">Add To Cart</button>
              </form>
            </div>
          </div>`
      )
      .join('');
  };

  return layout({
    content: `
    
    <div class="d-flex justify-content-center my-5">
      <div class="products-list d-flex flex-wrap justify-content-start">
        ${renderProducts()}
      </div>
    </div>
    `,
  });
};
