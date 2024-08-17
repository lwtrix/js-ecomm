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

// render form to edit a product
router.get('/admin/products/:id/edit', isAuthenticated, async (req, res) => {
  const { id } = req.params;

  const product = await Products.getOneById(id);

  if (!product) {
    return res.send('Product does not exist');
  }

  res.send(editProductView({ product }));
});

router.post(
  '/admin/products/:id/edit',
  isAuthenticated,
  upload.single('productImage'),
  [requireProductName, requireProductPrice],
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
      res.redirect('/admin/products');
    }

    res.redirect('/admin/products');
  }
);

// remove a product
router.post('/admin/products/:id/delete', isAuthenticated, async (req, res) => {
  await Products.delete(req.params.id);

  res.redirect('/admin/products')
});

module.exports = router;
