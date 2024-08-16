const getError = require('../../utils');
const layout = require('../layout');

module.exports = ({ errors }) => {
  return layout({
    content: `
      <div class="mt-5">
        <form method="POST" enctype="multipart/form-data" class="col-lg-6 col-12 mx-auto">

          <div class="mb-2">
            <label for="productNameField" class="form-label">Product Name</label>
            <div class="input-group has-validation">
              <input name="productName" type="text" class="form-control ${getError(errors, 'productName') ? "is-invalid" : ""}" id="productNameField" aria-describedby="productNameFieldFeedback">
              <div id="productNameFieldFeedback" class="invalid-feedback">
                ${getError(errors, 'productName')}
              </div>
            </div>
          </div>

          <div class="mb-2">
            <label for="productPriceField" class="form-label">Price</label>
            <div class="input-group has-validation">
              <input name="productPrice" type="text" class="form-control ${getError(errors, 'productPrice') ? "is-invalid" : ""}" id="productPriceField" aria-describedby="productPriceFieldFeedback">
              <div id="productPriceFieldFeedback" class="invalid-feedback">
                ${getError(errors, 'productPrice')}
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label for="productImageField" class="form-label">Thumbnail</label>
            <div class="input-group has-validation">
              <input name="productImage" type="file" class="form-control" id="productImageField" aria-describedby="productImageFieldFeedback">
              <div id="productImageFieldFeedback" class="invalid-feedback">
                Validation error
              </div>
            </div>
          </div>

          <button class="btn btn-success col-2">Publish</button>
        </form>
      </div>
    `,
  });
};
