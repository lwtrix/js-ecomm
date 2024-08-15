const express = require('express');
const { handleValErrors } = require('../../middleware/admin/index');
const multer = require('multer');

const Products = require('../../repositories/products');
const { requireProductName, requireProductPrice } = require('./validators');

const addProductView = require('../../views/admin/products/add');
const productsIndexView = require('../../views/admin/products/index');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// get all products
router.get('/', async (req, res) => {
  const products = await Products.getAll();

  res.send(productsIndexView({ products }))
});

// render form to add a product
router.get('/add', (req, res) => {
  res.send(addProductView({}));
});

// add a product
router.post(
  '/add',
  upload.single('productImage'),
  [requireProductName, requireProductPrice],
  handleValErrors(addProductView),
  async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { productName, productPrice } = req.body;

    await Products.create({ productName, productPrice, image });

    res.send('success');
  }
);

// get a single product
router.get('/:id', (req, res) => {});

// render form to edit a product
router.get('/edit/:id', (req, res) => {});

// edit a product
router.put('/:id', (req, res) => {});

// remove a product
router.delete('/:id', (req, res) => {});

module.exports = router;
