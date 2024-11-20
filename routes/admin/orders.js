const express = require('express');

const OrdersRepository = require('../../repositories/orders');
const adminOrdersView = require('../../views/admin/orders/index');
const Products = require('../../repositories/products');

const router = express.Router();

router.get('/admin/orders', async (req, res) => {
  const orders = await OrdersRepository.getAll();

  if (!orders.length) {
    return res.send(adminOrdersView({}));
  }

  return res.send(adminOrdersView({ orders }));
});

router.get('/admin/orders/:id', async (req, res) => {
  const orderId = req.params.id;
  const order = await OrdersRepository.getOneById(orderId);

  let itemsIds = order.items.map(item => item.id);
  const orderItems = await Products.getMany({ id: [...itemsIds] });

  res.send(orderItems)
});

module.exports = router;
