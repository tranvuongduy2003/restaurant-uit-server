const express = require('express');

const foodController = require('../controller/food');

const router = express.Router();

router.get('/', foodController.getFoods);

router.get('/best-deals', foodController.getBestDeals);

router.get('/popular', foodController.getPopular);

router.get('/search', foodController.getSearchFoods);

router.get('/:foodId', foodController.getFood);

module.exports = router;
