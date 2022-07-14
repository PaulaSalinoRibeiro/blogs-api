const JWT = require('../services/jwt.services');

const authToken = (req, _res, next) => {
  const { token } = req.headers;

  try {
    if (!token) {
      const e = new Error('Token not found');
      e.code = 'Unauthorized';
      throw e;
    }

    JWT.checkToken(token);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authToken;