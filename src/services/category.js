const Joi = require('joi');
const httpErrors = require('http-errors');
const { Op } = require('sequelize');
const { Category } = require('../database/models/index');

module.exports = {
  validateName(name) {
    const { error } = Joi.string().required().validate(name);
    if (error) throw new httpErrors.BadRequest('"name" is required');
  },

  async categoriesExists(categoriesIds) {
    const categories = await Category.findAll({
      where: {
        id: { [Op.in]: categoriesIds },
      },
    });
    if (categories.length !== categoriesIds.length) return false;
    return true;
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