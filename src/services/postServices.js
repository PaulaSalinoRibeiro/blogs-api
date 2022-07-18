const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Joi = require('joi');
const config = require('../database/config/config');
const { User, Category, BlogPost, PostCategory } = require('../database/models');

const sequelize = new Sequelize(config.development);

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()).min(1),
});

const schemaEdit = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
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
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', attributes: ['id', 'name'] },
  ],
  });
  return list;
};

const findById = async (id) => {
  const blog = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  if (!blog) throwError('NotFound', 'Post does not exist');

  return blog;
};

const updated = async (title, content, id, email) => {
  const { error } = schemaEdit.validate({ title, content });
  if (error) throwError('BadRequest', 'Some required fields are missing');

  const user = await User.findOne({ where: { email } });

  const post = await BlogPost.findAll({
    where: { [Op.and]: [{ id }, { userId: user.id }] } });

  if (post.length === 0) throwError('Unauthorized', 'Unauthorized user');

  await BlogPost.update({ title, content }, { where: { id } });

  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });
  return result;
};

module.exports = {
  create,
  listAll,
  findById,
  updated,
};