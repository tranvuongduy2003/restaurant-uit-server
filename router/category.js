const express = require('express');

const categoryController = require('../controller/category');
<<<<<<< HEAD

const router = express.Router();

router.get('/', categoryController.getCategories);
=======
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, categoryController.getCategories);

router.get('/popular', isAuth, categoryController.getPopular);

router.get('/:categoryId', isAuth, categoryController.getCategory);
>>>>>>> master

module.exports = router;
