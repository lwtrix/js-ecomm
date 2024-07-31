const express = require('express')
const Admins = require('../../repositories/admins.js')

const router = express.Router()

router.get('/signup', (req, res) => {
  res.send(`
    <div>
    <h1>Create an account</h1>
      <form method="POST">
        <input name="email" placeholder="E-mail"/>
        <input type="password"  name="password" placeholder="Password"/>
        <input type="password" name="passwordConfirmation"  placeholder="Confirm Password"/>
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

router.post('/signup', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const userExists = await Admins.getOneBy({ email });

  if (userExists) {
    return res.send('Email is in use');
  }

  if (password !== passwordConfirmation) {
    return res.send('Password and password confirmation must match');
  }

  const user = await Admins.create({ email, password });
  req.session.user = user.id;

  res.send('authenticated');
});

router.get('/signin', (req, res) => {
  res.send(`
    <div>
    <h1>Sign in</h1>
      <form method="POST">
        <input name="email" placeholder="E-mail"/>
        <input type="password"  name="password" placeholder="Password"/>
        <button>Sign In</button>
      </form>
    </div>
  `);
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
  res.send('authenticated')
});

router.get('/signout', (req, res) => {
  req.session = null;

  res.redirect('/signin');
});

module.exports = router