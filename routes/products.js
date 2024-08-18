const express = require('express')

const Products = require('../repositories/products')
const productsIndexView = require('../views/products/index')

const router = express.Router()

router.get('/', async (req, res) => {
  const products = await Products.getAll();

  res.send(productsIndexView({ products }))
})  

module.exports = router