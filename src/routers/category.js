const express = require('express');
const controllers = require('../controllers/category');
const globalMiddlewares = require('../middlewares/global');

const router = express.Router();
router.use(globalMiddlewares.validateToken);

router.post('/', controllers.createCategorie);
router.get('/', controllers.getAll);

module.exports = router;