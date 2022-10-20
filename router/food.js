const express = require('express');

const foodController = require('../controller/food');

const router = express.Router();

router.get('/', foodController.getFoods);

router.get('/:foodId', foodController.getFood);

router.get('/best-deals', foodController.getBestDeals);

router.get('/popular', foodController.getPopular);

module.exports = router;
