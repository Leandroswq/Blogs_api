const express = require('express');
const controllers = require('../controllers/user');

const router = express.Router();

router.post('/', controllers.createUser);

module.exports = router;