const express = require('express');

const foodController = require('../controller/food');

const router = express.Router();

router.get('/', foodController.getFoods);

module.exports = router;
