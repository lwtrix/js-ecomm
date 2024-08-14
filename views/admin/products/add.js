const getError = require('../../utils');
const layout = require('../layout');

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div>
        <form method="POST" enctype="multipart/form-data">
          <input placeholder="Name" name="productName"/>
          ${getError(errors, 'productName')}
          <input placeholder="Price" name="productPrice"/>
          ${getError(errors, 'productPrice')}
          <input type="file" name="productImage"/>
          <button>Submit</button>
        </form>
      </div>
    `,
  });
};
