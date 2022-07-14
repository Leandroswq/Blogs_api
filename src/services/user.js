const httpErrors = require('http-errors');
const Joi = require('joi');
const { User } = require('../database/models/index');
const globalServices = require('./global');

function validateDisplayName(displayName) {
  const { error } = Joi.string().min(8).required().validate(displayName);
  if (error) {
    throw new httpErrors.BadRequest(
      '"displayName" length must be at least 8 characters long',
    );
  }
}

function validateEmail(email) {
  const { error } = Joi.string().email().required().validate(email);
  if (error) throw new httpErrors.BadRequest('"email" must be a valid email');
}

function validatePassword(password) {
  const { error } = Joi.string().min(6).required().validate(password);
  if (error) {
    throw new httpErrors.BadRequest(
      '"password" length must be at least 6 characters long',
    );
  }
}

module.exports = {
  async userExist(email) {
    const user = await User.findOne({ where: { email } });
  
    if (user) return true;
    
    return false;
  },

  async validateUserData(userData) {
    validateDisplayName(userData.displayName);
    validateEmail(userData.email);
    validatePassword(userData.password);
    const exist = await this.userExist(userData.email);
    if (exist) throw new httpErrors.Conflict('User already registered');
  },

  async createUser(userData) {
    const user = await User.create(userData);
    const token = globalServices.generateToken({ id: user.id });

    return token;
  },
};
