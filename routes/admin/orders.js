const express = require('express')

const OrdersRepository = require('../../repositories/orders')

const router = express.Router()

router.get('/admin/orders', async (req, res) => {
  const orders = await OrdersRepository.getAll()

  if(!orders.length) {
    return res.send([])
  }

  return res.send(orders)
})

module.exports = router