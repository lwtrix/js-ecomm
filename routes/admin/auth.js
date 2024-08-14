const express = require('express');
const { handleValErrors } = require('../../middleware/admin/index');

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
  handleValErrors(signUpView),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await Admins.create({ email, password });
    req.session.user = user.id;

    res.send('account created');
  }
);

router.get('/signin', (req, res) => {
  res.send(signInView({}));
});

router.post(
  '/signin',
  [checkEmailExists, checkPassword],
  handleValErrors(signInView),
  async (req, res) => {
    res.send('authenticated');
  }
);

router.get('/signout', (req, res) => {
  req.session = null;

  res.redirect('/signin');
});

module.exports = router;
