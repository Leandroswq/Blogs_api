const postCategory = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    categoryId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    postId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
   },{
    tableName: 'PostCategories',
    timestamps: false
  });


  postCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost,{
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'blogPost'
    })

    models.BlogPost.belongsToMany(models.Category,{
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories'
    })
  }

  return postCategory;
};

module.exports = postCategory;