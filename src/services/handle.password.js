const bycrypt = require('bcrypt');

const encryptPassword = (password) => {
  const salt = bycrypt.genSaltSync(5);
  const encrypedPassword = bycrypt.hashSync(password, salt);
  return encrypedPassword;
};

const checkPassword = (password, passwordHash) => {
  const isMatch = bycrypt.compare(password, passwordHash);
  if (!isMatch) {
    const err = new Error('Invalid fields');
    err.code = 'BadRequest';
    throw err;
  }
};

module.exports = {
  encryptPassword,
  checkPassword,
};