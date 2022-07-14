const express = require('express');
const controllers = require('../controllers/login');

const router = express.Router();

router.post('/', controllers.login);

module.exports = router;