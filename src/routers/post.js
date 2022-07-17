const express = require('express');
const globalMiddlewares = require('../middlewares/global');
const controler = require('../controllers/post');

const router = express.Router();
router.use(globalMiddlewares.validateToken);

router.post('/', controler.createPost);
router.get('/', controler.getAll);
router.get('/:id', controler.getById);

module.exports = router;