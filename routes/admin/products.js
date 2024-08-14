const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const Products = require('../../repositories/products');
const { requireProductName, requireProductPrice } = require('./validators');

const addProductView = require('../../views/admin/products/add');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', (req, res) => {
  // get all products
});

router.get('/add', (req, res) => {
  // render form to add a product
  res.send(addProductView({}));
});

router.post(
  '/add',
  upload.single('productImage'),
  [requireProductName, requireProductPrice],
  async (req, res) => {
    // add a product
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
      return res.send(addProductView({ errors: valErrors }));
    }

    const image = req.file.buffer.toString('base64');
    const { productName, productPrice } = req.body;

    await Products.create({ productName, productPrice, image });

    res.send('success');
  }
);

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
