const express = require('express');
const cookieSession = require('cookie-session')
const Users = require('./repositories/users.js')

const server = express();

server.use(express.urlencoded({extended: true}))
server.use(express.json())
server.use(cookieSession({
  keys: ['adwfrwfdawd21d2']
}))

server.get('/', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="E-mail"/>
        <input type="password"  name="password" placeholder="Password"/>
        <input type="password" name="passwordConfirmation"  placeholder="Confirm Password"/>
        <button>Submit</button>
      </form>
    </div>
  `);
});

server.post('/', async (req, res) => {
  const { email, password, passwordConfirmation} = req.body

  const userExists = await Users.getOneBy({ email })

  if(userExists) {
    return res.send('Email is in use')
  }

  if(password !== passwordConfirmation) {
    return res.send('Password and password confirmation must match')
  }

  const user = await Users.create({email, password})
  req.session.user = user

  res.send('authenticated');
});

server.listen(3001, () => {
  console.log('ECOMM Server Status: Live (PORT: 3001)');
});
