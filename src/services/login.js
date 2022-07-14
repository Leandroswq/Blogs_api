const httpErrors = require('http-errors');
const Joi = require('joi');
const { User } = require('../database/models/index');
const globalServices = require('./global');

module.exports = {
  async verifyLogin(email, password) {
    const { error } = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).validate({ email, password });

    if (error) {
      throw new httpErrors.BadRequest('Some required fields are missing');
    }
  },

  async login(email, password) {
    const user = await User.findOne({
      where: { email },
    });
    if (user === null || user.password !== password) {
      throw new httpErrors.BadRequest('Invalid fields');
    }
    const token = globalServices.generateToken({ id: user.id });

    return token;
  },
};