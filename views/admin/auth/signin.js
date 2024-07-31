const layout = require('../layout.js');

module.exports = () => {
  return layout({
    content: `
    <div>
    <h1>Sign in</h1>
      <form method="POST">
        <input name="email" placeholder="E-mail"/>
        <input type="password"  name="password" placeholder="Password"/>
        <button>Sign In</button>
      </form>
    </div>
  `,
  });
};
