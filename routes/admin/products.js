const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Products = require('../../repositories/products');

const addProductView = require('../../views/admin/products/add');
const { requireProductName, requireProductPrice } = require('./validators');

router.get('/', (req, res) => {
  // get all products
});

router.get('/add', (req, res) => {
  // render form to add a product
  res.send(addProductView({}));
});

router.post('/add', [requireProductName, requireProductPrice], (req, res) => {
  // add a product

  const valErrors = validationResult(req);
  if (!valErrors.isEmpty()) {
    console.log(valErrors);
    return res.send('errors');
  }

  res.send('success')
});

router.get('/:id', (req, res) => {
  // get a single product
});

router.get('/edit/:id', (req, res) => {
  // render form to edit a product
});

router.put('/:id', (req, res) => {
  // edit a product
});

router.delete('/:id', (req, res) => {
  // remove a product
});

module.exports = router;
