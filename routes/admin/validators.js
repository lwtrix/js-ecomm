const PRODUCTS_CATEGORIES = ['Tops', 'Bottoms', 'Outerwear', 'Accessories' , 'Headwear', 'Dresses']
const PRODUCTS_GENDERS = ['men', 'women']

const { check } = require('express-validator');
const Admins = require('../../repositories/admins');

module.exports = {
  // USER COLLECTION VALIDATIONS
  requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom(async (email) => {
      const userExists = await Admins.getOneBy({ email });
      if (userExists) {
        throw new Error('Email is already in use');
      }
    }),
  requirePassword: check('password')
    .trim()
    .isLength({ min: 6, max: 18 })
    .withMessage('Password must be between 6 and 18 characters'),
  requirePasswordConfirm: check('passwordConfirmation')
    .trim()
    .isLength({ min: 6, max: 18 })
    .withMessage('Password must be between 6 and 18 characters')
    .custom((passwordConfirmation, { req }) => {
      if (req.body.password !== passwordConfirmation) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  checkEmailExists: check('email')
    .trim()
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom(async (email) => {
      const foundUser = await Admins.getOneBy({ email });
      if (!foundUser) {
        throw new Error('An account with that email does not exist');
      }
    }),
  checkPassword: check('password')
    .trim()
    .custom(async (password, { req }) => {
      const foundUser = await Admins.getOneBy({ email: req.body.email });
      if (!foundUser) {
        throw new Error('Email and password do not match');
      }

      const pwMatch = await Admins.passwordAuth(foundUser.password, password);
      if (!pwMatch) {
        throw new Error('Wrong password entered');
      }
    }),
  // PRODUCTS COLLECTION VALIDATIONS
  requireProductName: check('productName')
    .trim()
    .isLength({ min: 3, max: 48 })
    .withMessage('Please enter a name between 3 and 36 characters'),
  requireProductPrice: check('productPrice')
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage('Products must have a minimum price of £1'),
  requireCategory: check('productCategory')
  .trim()
  .custom((productCategory => {
    const categExists = PRODUCTS_CATEGORIES.find(categ => categ.toLowerCase() === productCategory.toLowerCase())
    if(!categExists) {
      throw new Error('Please provide an existing category')
    }
    return true;
  }))
};
