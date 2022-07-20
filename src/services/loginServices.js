const Joi = require('joi');
const JWT = require('./jwt.services');
const Password = require('./handle.password');
const { User } = require('../database/models');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const login = async (email, password) => {
  const { error } = schema.validate({ email, password });
  
  if (error) {
    const err = new Error('Some required fields are missing');
    err.code = 'BadRequest';
    throw err;
  }
  
  const userLogin = await User.findOne({ where: { email } });

  Password.checkPassword(password, userLogin.password);
  
  if (!userLogin) {
    const err = new Error('Invalid fields');
    err.code = 'BadRequest';
    throw err;
  } 

  const token = JWT.createToken(email);

  return token;
};

module.exports = { 
  login,
};