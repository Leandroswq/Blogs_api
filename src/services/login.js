const httpErrors = require('http-errors');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models/index');
require('dotenv').config();

const jwtSecrete = process.env.JWT_SECRET;

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
    const token = jwt.sign({ id: user.id }, jwtSecrete, { expiresIn: '7d' });

    return token;
  },
};