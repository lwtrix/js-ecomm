const express = require('express');
const cookieSession = require('cookie-session');
const Users = require('./repositories/users.js');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  cookieSession({
    keys: ['adwfrwfdawd21d2'],
  })
);

server.get('/signup', (req, res) => {
  res.send(`
    <div>
    <h1>Create an account</h1>
    You're signed in as: ${req.session.user}
      <form method="POST">
        <input name="email" placeholder="E-mail"/>
        <input type="password"  name="password" placeholder="Password"/>
        <input type="password" name="passwordConfirmation"  placeholder="Confirm Password"/>
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

server.post('/signup', async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const userExists = await Users.getOneBy({ email });

  if (userExists) {
    return res.send('Email is in use');
  }

  if (password !== passwordConfirmation) {
    return res.send('Password and password confirmation must match');
  }

  const user = await Users.create({ email, password });
  req.session.user = user;

  res.send('authenticated');
});

server.get('signin', (req, res) => {
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

server.get('/signout', (req, res) => {
  req.session = null;

  res.redirect('/signin');
});

server.listen(3001, () => {
  console.log('ECOMM Server Status: Live (PORT: 3001)');
});
