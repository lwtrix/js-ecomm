const CartRepository = require('../repositories/carts');
const emptyCartView = require('../views/cart/empty');

const isCartEmpty = async (req, res, next) => {
  if (!req.session.cart) {
    return res.send(emptyCartView());
  }

  const cart = await CartRepository.getOneById(req.session.cart);

  if (!cart.items.length) {
    return res.send(emptyCartView());
  }

  next();
};

module.exports = {
  isCartEmpty,
};
