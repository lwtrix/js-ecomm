const express = require('express');
const {
  handleValErrors,
  isAuthenticated,
} = require('../../middleware/admin/index');
const multer = require('multer');

const Products = require('../../repositories/products');
const { requireProductName, requireProductPrice } = require('./validators');

const addProductView = require('../../views/admin/products/add');
const productsIndexView = require('../../views/admin/products/index');
const editProductView = require('../../views/admin/products/edit');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// get all products
router.get('/admin/products', isAuthenticated, async (req, res) => {
  const products = await Products.getAll();

  res.send(productsIndexView({ products }));
});

// render form to add a product
router.get('/admin/products/add', isAuthenticated, (req, res) => {
  res.send(addProductView({}));
});

// add a product
router.post(
  '/admin/products/add',
  isAuthenticated,
  upload.single('productImage'),
  [requireProductName, requireProductPrice],
  handleValErrors(addProductView),
  async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { productName, productPrice } = req.body;

    await Products.create({ productName, productPrice, image });

    res.redirect('/admin/products');
  }
);

// get a single product
router.get('/admin/products/:id/edit', async (req, res) => {
  const { id } = req.params;

  const product = await Products.getOneById(id);

  if (!product) {
    return res.send('Product does not exist');
  }

  res.send(editProductView({ product }));
});

// render form to edit a product
router.get('/edit/:id', (req, res) => {});

// edit a product
router.put('/:id', (req, res) => {});

// remove a product
router.delete('/:id', (req, res) => {});

module.exports = router;
