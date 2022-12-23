const express = require('express');

const reservationController = require('../controller/reservation');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/', isAuth, reservationController.reservate);

module.exports = router;
