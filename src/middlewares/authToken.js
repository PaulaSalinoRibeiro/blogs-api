const JWT = require('../services/jwt.services');

const authToken = (req, _res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      const e = new Error('Token not found');
      e.code = 'Unauthorized';
      throw e;
    }

    JWT.checkToken(authorization);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authToken;