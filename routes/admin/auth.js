const express = require('express');
const { validationResult } = require('express-validator');

const Admins = require('../../repositories/admins.js');

const {
  requireEmail,
  requirePassword,
  requirePasswordConfirm,
  checkEmailExists,
  checkPassword,
} = require('./validators.js');

const signInView = require('../../views/admin/auth/signin.js');
const signUpView = require('../../views/admin/auth/signup.js');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.send(signUpView({ req }));
});

router.post(
  '/signup',
  [requireEmail, requirePassword, requirePasswordConfirm],
  async (req, res) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
      return res.send(signUpView({ req, errors: valErrors }));
    }

    const { email, password } = req.body;

    const user = await Admins.create({ email, password });
    req.session.user = user.id;

    res.send('account created');
  }
);

router.get('/signin', (req, res) => {
  res.send(signInView({}));
});

router.post('/signin', [checkEmailExists, checkPassword], async (req, res) => {
  const valErrors = validationResult(req);
  if (!valErrors.isEmpty()) {
    return res.send(signInView({ req, errors: valErrors }));
  }

  res.send('authenticated');
});

router.get('/signout', (req, res) => {
  req.session = null;

  res.redirect('/signin');
});

module.exports = router;
