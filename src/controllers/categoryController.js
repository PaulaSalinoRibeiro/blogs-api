const categoryService = require('../services/categoryServices');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await categoryService.create(name);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const listAll = async (_req, res) => {
  const result = await categoryService.listAll();
  res.status(200).json(result);
};

module.exports = {
  create,
  listAll,
};