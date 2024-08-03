const getError = (errors, field) => {
  if (errors) {
    if (!errors.mapped()[field]) {
      return '';
    }
    const errMsg = errors.mapped()[field].msg;
    return errMsg;
  }

  return '';
};

module.exports = getError