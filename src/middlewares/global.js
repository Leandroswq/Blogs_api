const services = require('../services/global');

module.exports = {
  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  validateToken(req, _res, next) {
    const { authorization } = req.headers;
    const data = services.validateToken(authorization);
    req.user = data;

    next();
  },
};