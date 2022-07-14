const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecrete = process.env.JWT_SECRET;

module.exports = {
  generateToken(payload) {
    const token = jwt.sign(payload, jwtSecrete, { expiresIn: '7d' });
    return token;
  }, 
};