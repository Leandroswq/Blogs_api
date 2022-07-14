/**
 * @param {import('sequelize')} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 * @returns
 */
const category = (sequelize, DataTypes) => {
  const category = sequelize.define(
    "Category",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
				autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      tableName: "Categories",
      timestamps: false,
    }
  );

  return category;
};

module.exports = category;
