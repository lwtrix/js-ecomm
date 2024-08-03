const layout = require('../layout.js');
const getError = require('../../utils.js')


module.exports = ({ errors }) => {
  return layout({
    content: `
    <div>
    <h1>Create an account</h1>
      <form method="POST">
        <input name="email" placeholder="E-mail"/>
        ${getError(errors, 'email')}
        <input type="password"  name="password" placeholder="Password"/>
        ${getError(errors, 'password')}
        <input type="password" name="passwordConfirmation"  placeholder="Confirm Password"/>
        ${getError(errors, 'passwordConfirmation')}     
        <button>Sign Up</button>
      </form>
    </div>
  `,
  });
};
