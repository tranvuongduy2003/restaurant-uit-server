const express = require('express');

const foodController = require('../controller/food');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', foodController.getFoods);

router.get('/deleted', isAuth, foodController.getDeletedFoods);

router.get('/best-deals', foodController.getBestDeals);

router.get('/popular', foodController.getPopular);

router.get('/:foodId', foodController.getFood);

module.exports = router;
