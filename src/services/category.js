const { Category } = require('../database/models/index');

module.exports = {
  async createCategorie(name) {
    const category = await Category.create({ name });

    return category;
  },
};