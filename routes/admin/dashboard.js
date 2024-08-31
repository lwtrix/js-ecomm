const express = require('express')
const { isAuthenticated } = require('../../middleware/admin')

const adminDashboardView = require('../../views/admin/dashboard')

const router = express.Router()

router.get('/admin/dashboard', async (req, res) => {
  res.send(adminDashboardView())
})

module.exports = router