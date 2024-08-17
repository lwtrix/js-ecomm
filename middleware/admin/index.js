const { validationResult } = require('express-validator');

module.exports = {
  handleValErrors(viewTemplateFunc, dataCb) {
    return async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        let data = {};
        if (dataCb) {
          data = await dataCb(req);
        }
        return res.send(viewTemplateFunc({ errors, ...data }));
      }

      next();
    };
  },
  isAuthenticated(req, res, next) {
    if (!req.session.user) {
      return res.redirect('/admin/signin');
    }

    next();
  },
};
