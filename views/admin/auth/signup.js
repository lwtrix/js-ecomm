const layout = require('../layout.js');

module.exports = ({ req }) => {
  return layout({
    content: `
    <div>
    <h1>Create an account</h1>
      <form method="POST">
        <input name="email" placeholder="E-mail"/>
        <input type="password"  name="password" placeholder="Password"/>
        <input type="password" name="passwordConfirmation"  placeholder="Confirm Password"/>
        <button>Sign Up</button>
      </form>
    </div>
  `,
  });
};
