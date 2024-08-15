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

router.get('/admin/signup', (req, res) => {
  res.send(signUpView({ req }));
});

router.post(
  '/admin/signup',
  [requireEmail, requirePassword, requirePasswordConfirm],
  handleValErrors(signUpView),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await Admins.create({ email, password });
    req.session.user = user.id;

    res.redirect('/admin/products')
  }
);

router.get('/admin/signin', (req, res) => {
  res.send(signInView({}));
});

router.post(
  '/admin/signin',
  [checkEmailExists, checkPassword],
  handleValErrors(signInView),
  async (req, res) => {
    const { email } = req.body

    const user = await Admins.getOneBy({ email })
    req.session.user = user.id

    res.redirect('/admin/products')
  }
);

router.get('/admin/signout', (req, res) => {
  req.session = null;

  res.redirect('/admin/signin');
});

module.exports = router;
