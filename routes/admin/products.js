const express = require('express');
const {
  handleValErrors,
  isAuthenticated,
} = require('../../middleware/admin/index');
const multer = require('multer');
const fs = require('fs');

const Products = require('../../repositories/products');

const {
  requireProductName,
  requireProductPrice,
  requireCategory,
} = require('./validators');
const { optimizeAndSaveImage } = require('../../lib/images/utils');

const addProductView = require('../../views/admin/products/add');
const productsIndexView = require('../../views/admin/products/index');
const editProductView = require('../../views/admin/products/edit');
const path = require('path');

const router = express.Router();

const storage = multer.memoryStorage();
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
    const filename = `${Date.now()}-${req.file.originalname}`;

    const productImage = await optimizeAndSaveImage(
      req.file.buffer,
      filename,
      req.file.mimetype
    );

    const newProduct = {
      ...req.body,
      productImage,
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

// edit a product
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
    let editedProduct;
    editedProduct = { ...req.body };

    if (req.file) {
      const product = await Products.getOneById(req.params.id);
      const imgPath = path.join(
        __dirname,
        '../../public/',
        product.productImage
      );
      fs.unlink(imgPath, async (err) => {
       if(err) {
        console.log(err)
        res.redirect('/admin/products')
       }
      });

      const filename = `${Date.now()}-${req.file.originalname}`;
      productImage = await optimizeAndSaveImage(
        req.file.buffer,
        filename,
        req.file.mimetype
      );

      editedProduct = {
        ...req.body,
        productImage,
      };
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
  const product = await Products.getOneById(req.params.id);

  const imgPath = path.join(__dirname, '../../public/', product.productImage);
  fs.unlink(imgPath, async (err) => {
    if (!err) {
      await Products.delete(req.params.id);
      return res.redirect('/admin/products');
    }
    console.log(err);
    return res.redirect('admin/products');
  });
});

module.exports = router;
