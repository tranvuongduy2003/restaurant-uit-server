const express = require('express');

const categoryController = require('../controller/category');

const router = express.Router();

router.get('/', categoryController.getCategories);

router.get('/popular', categoryController.getPopular);

router.get('/search', categoryController.getSearchCategories);

router.get('/:categoryId', categoryController.getCategory);

router.put('/:categoryId', categoryController.updateCategory);

router.delete('/:categoryId', categoryController.deleteCategory);

module.exports = router;
