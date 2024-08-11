const express = require('express');
const Products = require('../../repositories/products');
const router = express.Router();

const addProductView = require('../../views/admin/products/add');

router.get('/', (req, res) => {
  // get all products
});

router.get('/add', (req, res) => {
  // render form to add a product

  res.send(addProductView({}));
});

router.post('/add', (req, res) => {
  // add a product
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
