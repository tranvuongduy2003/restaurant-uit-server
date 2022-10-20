const express = require('express');

const categoryController = require('../controller/category');

const router = express.Router();

router.get('/', categoryController.getCategories);

router.get('/:categoryId', categoryController.getCategory);

module.exports = router;
