const services = require('../services/category');

module.exports = {
  /**
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  */
  async createCategorie(req, res) {
    const { name } = req.body;
    services.validateName(name);
    const category = await services.createCategorie(name);

    res.status(201).json(category);
  },
};