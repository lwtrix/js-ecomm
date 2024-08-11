const layout = require('../layout');

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div>
        <form method="POST">
          <input placeholder="Name" name="productName"/>
          <input placeholder="Price" name="productPrice"/>
          <input type="file" name="productImage"/>
          <button>Submit</button>
        </form>
      </div>
    `,
  });
};
