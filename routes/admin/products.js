const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  // get all products
});

router.get('/add', (req, res) => {
  // render form to add a product
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
