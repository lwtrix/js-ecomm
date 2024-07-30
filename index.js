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

server.get('/home', (req, res) => {
  if (!req.session?.user) {
    return res.redirect('/signin');
  }

  return res.send(`
    <h1>Welcome, your user id is: ${req.session.user}</h1>
    <form action="/signout">
      <button>Signout</button>  
    </form>
  `);
});

server.get('/signup', (req, res) => {
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
  req.session.user = user.id;

  res.send('authenticated');
});

server.get('/signin', (req, res) => {
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

server.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await Users.getOneBy({ email });

  if (!foundUser) {
    return res.send('Email and password do not match');
  }

  const pwMatch = await Users.passwordAuth(foundUser.password, password);
  if (!pwMatch) {
    return res.send('Email and password do not match');
  }

  req.session.user = foundUser.id;
  res.redirect('/home');
});

server.get('/signout', (req, res) => {
  req.session = null;

  res.redirect('/signin');
});

server.listen(3001, () => {
  console.log('ECOMM Server Status: Live (PORT: 3001)');
});
