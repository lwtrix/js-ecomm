const express = require('express');
const { check, validationResult } = require('express-validator');

const Admins = require('../../repositories/admins.js');

const signInView = require('../../views/admin/auth/signin.js');
const signUpView = require('../../views/admin/auth/signup.js');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signUpView({ req }));
});

router.post(
  '/signup',
  [
    check('email')
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
    check('password')
      .trim()
      .isLength({ min: 6, max: 18 })
      .withMessage('Password must be between 6 and 18 characters'),
    check('passwordConfirmation')
      .trim()
      .isLength({ min: 6, max: 18 })
      .withMessage('Password must be between 6 and 18 characters')
      .custom((passwordConfirmation, { req }) => {
        if (req.body.password !== passwordConfirmation) {
          throw new Error('Passwords do not match')
        }
      }),
  ],
  async (req, res) => {
    const valErrors = validationResult(req);
    
    if(!valErrors.isEmpty()) {
      return res.send('Validation errors')
    }

    const { email, password, passwordConfirmation } = req.body;

    const user = await Admins.create({ email, password });
    req.session.user = user.id;

    res.send('authenticated');
  }
);

router.get('/signin', (req, res) => {
  res.send(signInView());
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await Admins.getOneBy({ email });

  if (!foundUser) {
    return res.send('Email and password do not match');
  }

  const pwMatch = await Admins.passwordAuth(foundUser.password, password);

  if (!pwMatch) {
    return res.send('Email and password do not match');
  }

  req.session.user = foundUser.id;
  res.send('authenticated');
});

router.get('/signout', (req, res) => {
  req.session = null;

  res.redirect('/signin');
});

module.exports = router;
