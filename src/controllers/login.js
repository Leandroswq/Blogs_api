const services = require('../services/login');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async login(req, res) {
    const { email, password } = req.body;
    await services.verifyLogin(email, password);
    const token = await services.login(email, password);
    
    res.status(200).json({ token });
  },
};
