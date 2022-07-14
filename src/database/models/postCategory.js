const BlogPost = require("./blogPost");

const PostCategory = (sequelize, Datatypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: Datatypes.INTEGER, 
      foreignKey: true,
      primaryKey: true,
      reference: {
        model: 'BlogPost',
        key: 'id'
      },
    },
    categoryId: {
      type: Datatypes.INTEGER,
      primaryKey: true, 
      foreignKey: true,
      reference: {
        model: 'Category',
        key: 'id'
      }
    },
  }, {
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });
  }

  return PostCategory;
};

module.exports = PostCategory;