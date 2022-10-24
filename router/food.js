const express = require('express');

const foodController = require('../controller/food');

const router = express.Router();

router.get('/', foodController.getFoods);

router.get('/best-deals', foodController.getBestDeals);

router.get('/popular', foodController.getPopular);

router.get('/:foodId', foodController.getFood);

router.put('/:foodId', foodController.updateFood);

router.delete('/:foodId', foodController.deleteFood);

module.exports = router;
