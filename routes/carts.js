const express = require('express');

const CartRepository = require('../repositories/carts');
const ProductsRepository = require('../repositories/products');

const cartIndexView = require('../views/cart/index');
const { updateCartQuantity } = require('../lib/routes/cart');

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
router.get('/cart', async (req, res) => {
  if (!req.session.cart) {
    return res.send('Cart empty');
  }

  const cart = await CartRepository.getOneById(req.session.cart);

  const itemsIds = cart.items.map((item) => item.id);
  const cartItems = await ProductsRepository.getMany({ id: [...itemsIds] });

  for (let item of cart.items) {
    for (let cartItem of cartItems) {
      if (item.id === cartItem.id) {
        cartItem.quantity = item.quantity;
      }
    }
  }

  res.send(cartIndexView({ items: cartItems }));
});

router.post('/cart/:productId/increase', async (req, res) => {
  if (!req.session.cart) {
    return res.send('cart empty');
  }

  updateCartQuantity(req.session.cart, req.params.productId, true)

  res.redirect('/cart');
});

router.post('/cart/:productId/decrease', async (req, res) => {
  if (!req.session.cart) {
    res.send('cart empty');
  }

  updateCartQuantity(req.session.cart, req.params.productId, false)

  res.redirect('/cart');
});

router.post('/cart/:productId/delete', async (req, res) => {
  if (!req.session.cart) {
    return res.send('cart empty');
  }

  const cart = await CartRepository.getOneById(req.session.cart);

  const updatedItems = cart.items.filter(
    (item) => item.id !== req.params.productId
  );

  await CartRepository.update(req.session.cart, { items: updatedItems });

  res.redirect('/cart')
});

module.exports = router;
