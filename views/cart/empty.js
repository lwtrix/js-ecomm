const layout = require('../layout');

module.exports = () => {
  return layout({
    content: `
      <div class="cart-empty">
        <div class="msg-box d-flex w-50 flex-column text-center justify-content-center mx-auto mt-5 p-5">
          <p class="display-5">YOUR CART IS EMPTY</p>
          <a class="button button-fluid w-50 mx-auto" href="/">BACK TO SHOP</a>
        </div>
      </div>
    `,
  });
};
