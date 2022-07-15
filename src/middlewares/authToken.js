const JWT = require('../services/jwt.services');

const authToken = (req, _res, next) => {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      const e = new Error('Token not found');
      e.code = 'Unauthorized';
      throw e;
    }

    const userEmail = JWT.checkToken(authorization);
    
    req.user = userEmail;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authToken;