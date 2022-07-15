const Sequelize = require('sequelize');
const Joi = require('joi');
const config = require('../database/config/config');
const { User, Category, BlogPost, PostCategory } = require('../database/models');

const sequelize = new Sequelize(config.development);

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).min(1),
});

const throwError = (code, message) => {
  const e = new Error(message);
  e.code = code;
  throw e;
};

const formatted = (object) => ({
  id: object.id,
  title: object.title,
  content: object.content,
  userId: object.userId,
  updated: object.updatedAt,
  published: object.createdAt,
});

const create = async (title, content, categoryIds, user) => {
  const { error } = schema.validate({ title, content, categoryIds });
  if (error) throwError('BadRequest', 'Some required fields are missing');

  const t = await sequelize.transaction();

  try {
    const { id } = await User.findOne({ where: { email: user } }, { transaction: t });

    const ctg = await Category.findAll({ where: { id: categoryIds } }, { transaction: t });
    
    if (ctg.length === 0) throwError('BadRequest', '"categoryIds" not found');

    const newPost = await BlogPost.create({ title, content, userId: id }, { transaction: t });

    await Promise.all(categoryIds.map((item) => PostCategory
    .create({ postId: newPost.id, categoryId: item }, { transaction: t })));
    
    await t.commit();

    const result = formatted(newPost);
    
    return result;
  } catch (err) {
    await t.rollback();

    throwError('BadRequest', '"categoryIds" not found');
  }
};

const listAll = async () => {
  const list = await BlogPost.findAll({
    include: [
    {
      model: User, as: 'user', attributes: { exclude: ['password'] },
    },
    {
      model: Category, as: 'categories', attributes: ['id', 'name'],
    },
  ],
  });
  return list;
};

module.exports = {
  create,
  listAll,
};