const { validationResult } = require('express-validator');

module.exports = {
  handleValErrors(viewTemplateFunc) {
    return (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.send(viewTemplateFunc({ errors }));
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
