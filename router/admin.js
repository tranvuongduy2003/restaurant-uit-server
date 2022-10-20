const express = require('express');

const adminController = require('../controller/admin');

const route = express.Router();

route.post('/food', adminController.postCreateFood);

route.post('/category', adminController.postCreateCategory);

module.exports = route;
