/**
 * @param {import('sequelize')} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
const user = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
				autoIncrement: true,
      },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      tableName: "Users",
      timestamps: false,
    }
  );


  user.associate = (models) =>{
    user.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'blogPosts'
    })
  }

  return user;
};

module.exports = user;
