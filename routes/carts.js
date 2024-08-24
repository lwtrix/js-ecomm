const express = require('express');

const CartRepository = require('../repositories/carts');

const router = express.Router();

// add an item to the cart
router.post('/cart/:productId', async (req, res) => {
  if (!req.session.cart) {
    const cart = await CartRepository.create({
      items: [{ id: req.params.productId, quantity: 1 }],
    });
    req.session.cart = cart.id;
  } else {
    const cart = await CartRepository.getOneById(req.session.cart);

    const itemExists = cart.items.find(
      (item) => item.id === req.params.productId
    );

    if (!itemExists) {
      cart.items.push({ id: req.params.productId, quantity: 1 });
    } else {
      itemExists.quantity++;
    }

    await CartRepository.update(cart.id, { items: cart.items });
  }

  res.redirect('/');
});

// retrieve and render cart content
router.get('/', (req, res) => {});

module.exports = router;
