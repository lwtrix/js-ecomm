const layout = require('../layout.js');
const getError = require('../../utils.js')

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div>
    <h1>Sign in</h1>
      <form method="POST">
        <input name="email" placeholder="E-mail"/>
        ${getError(errors, 'email')}
        <input type="password"  name="password" placeholder="Password"/>
        ${getError(errors, 'password')}
        <button>Sign In</button>
      </form>
    </div>
  `,
  });
};
