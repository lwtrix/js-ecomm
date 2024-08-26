const CartRepository = require('../../repositories/carts');

const updateCartQuantity = async (cartId, productId, action) => {
  const cart = await CartRepository.getOneById(cartId);
  const item = cart.items.find((item) => item.id === productId);

  if (action) {
    item.quantity++;
  } else {
    item.quantity--;
  }

  await CartRepository.update(cartId, { items: cart.items });
};

module.exports = {
  updateCartQuantity,
};
