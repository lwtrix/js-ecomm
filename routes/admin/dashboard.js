const express = require('express');
const { isAuthenticated } = require('../../middleware/admin');

const OrdersRepository = require('../../repositories/orders');

const adminDashboardView = require('../../views/admin/dashboard');
const {
  calcTodayRevenue,
  calcTodaySales,
  calcTotalRevenue,
} = require('../../lib/admin/dashboard/stats');

const router = express.Router();

router.get('/admin/dashboard/revenue-graph', isAuthenticated, async (req, res) => {
  const orders = await OrdersRepository.getAll();

  res.json(orders);
});

router.get('/admin/dashboard', isAuthenticated, async (req, res) => {
  const orders = await OrdersRepository.getAll();

  const stats = {
    todaysRevenue: calcTodayRevenue(orders),
    todaysSales: calcTodaySales(orders),
    totalRevenue: calcTotalRevenue(orders),
  };

  res.send(adminDashboardView({ stats }));
});

module.exports = router;
