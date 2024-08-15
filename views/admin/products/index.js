const layout = require('./../layout');

module.exports = ({ products }) => {
  const renderedProducts = products.map((product) => {
    return `
      <p>${product.productName}</p>
    `
  }).join('')

  return layout({
    content: `
    <div>
      <h1>Products</h1>
      ${renderedProducts}
    </div>
    `,
  });
};
