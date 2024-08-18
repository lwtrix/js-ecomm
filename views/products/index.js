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
              <p class="card-text">${product.productPrice}</p>
              <a href="#" class="btn btn-primary">Add To Cart</a>
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
     
     <style>
      .products-list {
        margin: 0 auto !important;
      }

      .card-img-container {
        width: 100%;
        height: 300px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .card-img-top {
        width: 100%;
        height: 300px;
        object-fit: contain;
        object-position: center;
        padding: 12px;
      }

      .card {
        margin-right: 1%;
        margin-bottom: 1%;
        width:24%;
      }

    </style>
    
    `,
  });
};
