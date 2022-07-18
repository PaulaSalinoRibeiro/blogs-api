const postServices = require('../services/postServices');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const userEmail = req.user;
  
  try {
    const result = await postServices.create(title, content, categoryIds, userEmail);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const listAll = async (_req, res, next) => {
  try {
    const result = await postServices.listAll();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const findById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await postServices.findById(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const updated = async (req, res, next) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const userEmail = req.user;
  
  try {
    const result = await postServices.updated(title, content, id, userEmail);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  listAll,
  findById,
  updated,
};