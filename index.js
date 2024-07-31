const express = require('express');
const cookieSession = require('cookie-session');

const Admins = require('./repositories/admins.js');
const adminAuthRouter = require('./routes/admin/auth.js')

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  cookieSession({
    keys: ['adwfrwfdawd21d2'],
  })
);

server.use('/auth', adminAuthRouter)

server.listen(3001, () => {
  console.log('ECOMM Server Status: Live (PORT: 3001)');
});
