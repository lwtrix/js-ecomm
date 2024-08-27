const express = require('express')
const { isCartEmpty } = require('../middleware')

const CartRepository = require('../repositories/carts')
const ProductsRepository = require('../repositories/products')
const OrdersRepository = require('../repositories/orders')

const router = express.Router()

router.post('/checkout', isCartEmpty, async (req, res) => {
  const cart = await CartRepository.getOneById(req.session.cart)
  
  const totalPrice = cart.items.reduce((total, item) => {
    return total+= item.quantity * item.itemPrice
  }, 0)

  const newOrder = { items: [...cart.items ], totalPrice, date: new Date()}
  
  const order = await OrdersRepository.create({ ...newOrder })
  res.redirect('/cart')
})

module.exports = router
