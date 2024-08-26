const layout = require('../layout');

module.exports = () => {
  return layout({
    content: `
      <div class="cart-empty">
        <div class="d-flex w-50 flex-column text-center justify-content-center mx-auto mt-5">
          <p class="display-5">YOUR CART IS EMPTY</p>
          <button class="btn btn-primary w-50 mx-auto">BACK TO SHOP</button>
        </div>
      </div>
    `,
  });
};
