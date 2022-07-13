/** 
 * @param {import('sequelize')} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 * @returns 
 */
const user = (sequelize, DataTypes) => {
	const user = sequelize.define('User', {
		id: DataTypes.INTEGER,
		displayName: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING,
		image: DataTypes.STRING,
	},{
		tableName: 'Users'
	});
	
	return user;
};

module.exports = user;

