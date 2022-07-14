const { User } = require('../database/models/index');
const globalServices = require('./global');

module.exports = {
  async createUser(userData) {
    const user = await User.create(userData);
    const token = globalServices.generateToken({ id: user.id });
    
    return token;
  },
};