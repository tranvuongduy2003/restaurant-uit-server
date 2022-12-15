const express = require('express');

const categoryController = require('../controller/category');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', categoryController.getCategories);

router.get('/deleted', isAuth, categoryController.getDeletedCategories);

router.get('/popular', categoryController.getPopular);

router.get('/:categoryId', categoryController.getCategory);

module.exports = router;
