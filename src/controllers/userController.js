const userServices = require('../services/userServices');

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  try {
    const result = await userServices.create(displayName, email, password, image);
    res.status(201).json({ token: result });
  } catch (err) {
    next(err);
  }
};

const listAll = async (_req, res) => {
  const users = await userServices.listAll();
  res.status(200).json(users);
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userServices.findById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  const userEmail = req.user;
  try {
    await userServices.remove(userEmail);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  listAll,
  findById,
  remove,
};