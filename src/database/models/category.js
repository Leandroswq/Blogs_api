const category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
		id: {primaryKey: true, type: DataTypes.STRING},
    name: DataTypes.STRING,
  },{
    underscored: true,
    tableName: 'Categories'
  });

  return category;
};

module.exports = category;