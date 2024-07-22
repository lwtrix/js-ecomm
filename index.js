const express = require('express');

const server = express();

server.use(express.urlencoded({extended: true}))
server.use(express.json())

server.get('/', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="E-mail"/>
        <input type="password"  name="password" placeholder="Password"/>
        <input type="password" name="passwordConfirm"  placeholder="Confirm Password"/>
        <button>Submit</button>
      </form>
    </div>
  `);
});

server.post('/', (req, res) => {
  res.send('authenticated');
});

server.listen(3001, () => {
  console.log('ECOMM Server Status: Live (PORT: 3001)');
});
