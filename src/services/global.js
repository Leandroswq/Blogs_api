const httpErrors = require('http-errors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecrete = process.env.JWT_SECRET;

module.exports = {
  generateToken(payload) {
    const token = jwt.sign(payload, jwtSecrete, { expiresIn: '7d' });
    return token;
  }, 
  validateToken(token) {
    if (!token) throw new httpErrors.Unauthorized('Token not found');
    try {
      const { iat, exp, ...data } = jwt.verify(token, jwtSecrete);
      return data;
    } catch (_err) {
      throw new httpErrors.Unauthorized('Expired or invalid token');
    }
  },
};