require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: '30d',
      algorithm: 'HS256',
  });
  return token;
};

const checkToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (_err) {
    const e = new Error('Expired or invalid token');
    e.code = 'Unauthorized';
    throw e;
  }
};

module.exports = {
  createToken,
  checkToken,
};