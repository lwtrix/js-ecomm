const express = require('express');

const CartRepository = require('../repositories/carts');
const ProductsRepository = require('../repositories/products');

const cartIndexView = require('../views/cart/index');
const { updateCartQuantity } = require('../lib/routes/cart');
const { isCartEmpty } = require('../middleware');

const router = express.Router();

// add an item to the cart
router.post('/cart/:productId', async (req, res) => {
  const product = await ProductsRepository.getOneById(req.params.productId);

  if (!req.session.cart) {
    const cart = await CartRepository.create({
      items: [
        { id: req.params.productId, quantity: 1, itemPrice: product.productPrice },
      ],
    });
    req.session.cart = cart.id;
  } else {
    const cart = await CartRepository.getOneById(req.session.cart);

    const itemExists = cart.items.find(
      (item) => item.id === req.params.productId
    );

    if (!itemExists) {
      cart.items.push({
        id: req.params.productId,
        quantity: 1,
        itemPrice: product.productPrice,
      });
    } else {
      itemExists.quantity++;
    }

    await CartRepository.update(cart.id, { items: cart.items });
  }

  res.redirect('/');
});

// retrieve and render cart content
router.get('/cart', isCartEmpty, async (req, res) => {
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

router.post('/cart/:productId/increase', isCartEmpty, async (req, res) => {
  updateCartQuantity(req.session.cart, req.params.productId, true);

  res.redirect('/cart');
});

router.post('/cart/:productId/decrease', isCartEmpty, async (req, res) => {
  updateCartQuantity(req.session.cart, req.params.productId, false);

  res.redirect('/cart');
});

router.post('/cart/:productId/delete', isCartEmpty, async (req, res) => {
  const cart = await CartRepository.getOneById(req.session.cart);

  const updatedItems = cart.items.filter(
    (item) => item.id !== req.params.productId
  );

  await CartRepository.update(req.session.cart, { items: updatedItems });

  res.redirect('/cart');
});

module.exports = router;
