const Joi = require('joi');
const { User } = require('../database/models');
const JWT = require('./jwt.services');

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

const create = async (displayName, email, password, image) => {
  const { error } = schema.validate({ displayName, email, password, image });

  if (error) {
    const err = new Error(error.message);
    err.code = 'BadRequest';
    throw err;
  }

  const userExist = await User.findOne({ where: { email } });

  if (userExist) {
    const err = new Error('User already registered');
    err.code = 'Conflict';
    throw err;
  }

  await User.create({ displayName, email, password, image });

  const token = JWT.createToken(email);

  return token;
};

const listAll = async () => {
  const result = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return result;
};

const findById = async (id) => {
  const result = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!result) {
    const e = new Error('User does not exist');
    e.code = 'NotFound';
    throw e;
  }

  return result;
};

const remove = async (email) => {
  await User.destroy({ where: { email } });
};

module.exports = {
  create,
  listAll,
  findById,
  remove,
};