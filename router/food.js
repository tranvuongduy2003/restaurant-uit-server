const express = require('express');

const foodController = require('../controller/food');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', isAuth, foodController.getFoods);

router.get('/deleted', isAuth, foodController.getDeletedFoods);

router.get('/best-deals', isAuth, foodController.getBestDeals);

router.get('/popular', isAuth, foodController.getPopular);

router.get('/:foodId', isAuth, foodController.getFood);

module.exports = router;
