const express = require('express');
const {
  handleValErrors,
  isAuthenticated,
} = require('../../middleware/admin/index');
const multer = require('multer');
const path = require('path')

const Products = require('../../repositories/products');
const { requireProductName, requireProductPrice, requireCategory } = require('./validators');

const addProductView = require('../../views/admin/products/add');
const productsIndexView = require('../../views/admin/products/index');
const editProductView = require('../../views/admin/products/edit');
const sharp = require('sharp');
const { optimizeAndSaveImage } = require('../../lib/images/utils');

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage });

// get all products
router.get('/admin/products', isAuthenticated, async (req, res) => {
  const products = await Products.getAll();

  return res.send(productsIndexView({ products }));
});

// render form to add a product
router.get('/admin/products/add', isAuthenticated, (req, res) => {
  return res.send(addProductView({}));
});

// add a product
router.post(
  '/admin/products/add',
  isAuthenticated,
  upload.single('productImage'),
  [requireProductName, requireProductPrice, requireCategory],
  handleValErrors(addProductView),
  async (req, res) => {
    const filename = `${Date.now()}-${req.file.originalname}`

    const productImage = await optimizeAndSaveImage(req.file.buffer, filename)

    const newProduct = {
      ...req.body,
      productImage
    };

    await Products.create(newProduct);

    return res.redirect('/admin/products');
  }
);

// render form to edit a product
router.get('/admin/products/:id/edit', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const product = await Products.getOneById(id);

  if (!product) {
    return res.send('Product does not exist');
  }

  return res.send(editProductView({ product }));
});

router.post(
  '/admin/products/:id/edit',
  isAuthenticated,
  upload.single('productImage'),
  [requireProductName, requireProductPrice, requireCategory],
  handleValErrors(editProductView, async (req) => {
    const product = await Products.getOneById(req.params.id);
    return { product };
  }),
  async (req, res) => {
    const editedProduct = req.body;

    if (req.file) {
      editedProduct.productImage = req.file.buffer.toString('base64');
    }

    try {
      await Products.update(req.params.id, editedProduct);
    } catch (err) {
      return res.redirect('/admin/products');
    }

    return res.redirect('/admin/products');
  }
);

// remove a product
router.post('/admin/products/:id/delete', isAuthenticated, async (req, res) => {
  await Products.delete(req.params.id);

  return res.redirect('/admin/products')
});

module.exports = router;
