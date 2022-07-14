const Joi = require('joi');
const httpErrors = require('http-errors');
const { Category } = require('../database/models/index');

module.exports = {
  validateName(name) {
    const { error } = Joi.string().required().validate(name);
    if (error) throw new httpErrors.BadRequest('"name" is required');
  },
  async createCategorie(name) {
    const category = await Category.create({ name });

    return category;
  },

  async getAll() {
    const categories = await Category.findAll();
    
    return categories;
  },
};