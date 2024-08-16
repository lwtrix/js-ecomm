const layout = require('../layout.js');
const getError = require('../../utils.js')

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div class="col-lg-5 col-12 mx-auto mt-5">
      <h3>Sign in</h3>
      <form method="POST">

        <div class="mb-2 mt-4">
          <label for="emailField" class="form-label">Email</label>
            <div class="input-group has-validation">
              <input name="email" type="text" class="form-control ${getError(errors, 'email') ? "is-invalid" : ""}" id="emailField" aria-describedby="emailFieldFeedback">
              <div id="emailFieldFeedback" class="invalid-feedback">
                ${getError(errors, 'email')}
              </div>
            </div>
        </div>

        <div class="mb-3">
          <label for="passwordField" class="form-label">Password</label>
            <div class="input-group has-validation">
              <input name="password" type="password" class="form-control ${getError(errors, 'password') ? "is-invalid" : ""}" id="passwordField" aria-describedby="passwordFieldFeedback">
              <div id="passwordFieldFeedback" class="invalid-feedback">
                ${getError(errors, 'password')}
              </div>
            </div>
        </div>

        <button class="btn btn-primary col-4">Sign In</button>
      </form>
    </div>
  `,
  });
};
