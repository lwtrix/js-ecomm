const express = require('express');
const { isCartEmpty } = require('../middleware');
const orderSummaryView = require('../views/orders/summary');

const CartRepository = require('../repositories/carts');
const OrdersRepository = require('../repositories/orders');
const ProductsRepository = require('../repositories/products');

const router = express.Router();

router.post('/checkout', isCartEmpty, async (req, res) => {
  const cart = await CartRepository.getOneById(req.session.cart);

  const totalPrice = cart.items.reduce((total, item) => {
    return (total += item.quantity * item.itemPrice);
  }, 0);

  const newOrder = { items: [...cart.items], totalPrice, date: new Date() };
  const order = await OrdersRepository.create({ ...newOrder });

  const itemsIds = order.items.map((item) => item.id);
  const products = await ProductsRepository.getMany({ id: [...itemsIds] });
  
  for(let product of products) {
    for(let item of order.items) {
      if(item.id === product.id) {
        item.name = product.productName
        item.image = product.productImage
      }
    }
  }

  res.send(orderSummaryView({ order }));
});

module.exports = router;
