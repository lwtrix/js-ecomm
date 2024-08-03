const { check } = require('express-validator');
const Admins = require('../../repositories/admins');

module.exports = {
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
      console.log('checking password confirm');
      if (req.body.password !== passwordConfirmation) {
        console.log('in here');
        throw new Error('Passwords do not match');
      }
      return true;
    }),
};
