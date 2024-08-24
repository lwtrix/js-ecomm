const express = require('express');

const CartRepository = require('../repositories/carts');
const ProductsRepository = require('../repositories/products')

const cartIndexView = require('../views/cart/index')

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
  const cart = await CartRepository.getOneById(req.session.cart)

  const itemsIds = cart.items.map(item => item.id)
  const cartItems = await ProductsRepository.getMany({ id: [...itemsIds]})

  for(let item of cart.items) {
    for(let cartItem of cartItems) {
      if(item.id === cartItem.id) {
        cartItem.quantity = item.quantity
      }
    }
  }

  res.send(cartIndexView({ items: cartItems }))
});

module.exports = router;
