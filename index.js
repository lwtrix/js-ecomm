const express = require('express');
const cookieSession = require('cookie-session');

const adminAuthRouter = require('./routes/admin/auth.js')
const adminProductsRouter = require('./routes/admin/products.js')

const server = express();

server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(
  cookieSession({
    keys: ['adwfrwfdawd21d2'],
  })
);

server.use('/', adminAuthRouter)
server.use('/', adminProductsRouter)

server.listen(3001, () => {
  console.log('ECOMM Server Status: Live (PORT: 3001)');
});
