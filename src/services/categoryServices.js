const { Category } = require('../database/models');

const create = async (name) => {
  if (!name) {
    const e = new Error('"name" is required');
    e.code = 'BadRequest';
    throw e;
  }

  const result = await Category.create({ name });
  
  return {
    id: result.null,
    name,
  };
};

const listAll = async () => {
  const categories = await Category.findAll();
  console.log(categories);
  return categories;
};

module.exports = {
  create,
  listAll,
};