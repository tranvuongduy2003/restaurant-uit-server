const express = require('express');

const foodController = require('../controller/food');
const isAuth = require('../middleware/is-auth');
const checkRole = require('../middleware/check-role');

const router = express.Router();

router.get('/', isAuth, checkRole.checkFoodRole, foodController.getFoods);

router.get(
  '/best-deals',
  isAuth,
  checkRole.checkFoodRole,
  foodController.getBestDeals
);

router.get(
  '/popular',
  isAuth,
  checkRole.checkFoodRole,
  foodController.getPopular
);

router.get('/:foodId', isAuth, checkRole.checkFoodRole, foodController.getFood);

module.exports = router;
