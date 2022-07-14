const services = require('../services/user');

module.exports = {
  /**
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  */
  async createUser(req, res) {
    const userData = req.body;

    await services.validateUserData(userData);
    const token = await services.createUser(userData);

    res.status(201).json({ token });
  },
  /**
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  */
  async getAll(_req, res) {
    const users = await services.getAll();

    res.status(200).json(users);
  },
};
