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

module.exports = {
  createUser,
  listAll,
};