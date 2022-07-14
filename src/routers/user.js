const express = require('express');
const controllers = require('../controllers/user');
const globalMiddlewares = require('../middlewares/global');

const router = express.Router();

router.post('/', controllers.createUser);
router.get('/', globalMiddlewares.validateToken, controllers.getAll);

module.exports = router;