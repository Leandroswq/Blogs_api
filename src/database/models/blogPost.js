/**
 * @param {import('sequelize')} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
const blogPost = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },{
    tableName: 'BlogPosts',
    updatedAt: 'updated',
    createdAt: 'published',
  });

  blogPost.associate = (models) =>{
    blogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'blogPosts'
    })
  }

  return blogPost;
};

module.exports = blogPost;