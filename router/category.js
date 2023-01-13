const express = require('express');

const categoryController = require('../controller/category');
const isAuth = require('../middleware/is-auth');
const checkRole = require('../middleware/check-role');

const router = express.Router();

router.get(
  '/',
  isAuth,
  checkRole.checkCategoryRole,
  categoryController.getCategories
);

router.get(
  '/popular',
  checkRole.checkCategoryRole,
  categoryController.getPopular
);

router.get(
  '/:categoryId',
  checkRole.checkCategoryRole,
  categoryController.getCategory
);

module.exports = router;
