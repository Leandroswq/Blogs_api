const express = require('express');
const controllers = require('../controllers/user');
const globalMiddlewares = require('../middlewares/global');

const router = express.Router();

router.post('/', controllers.createUser);

router.use(globalMiddlewares.validateToken);
router.get('/', controllers.getAll);
router.delete('/me', controllers.deleteUser);
router.get('/:id', controllers.getById);

module.exports = router;