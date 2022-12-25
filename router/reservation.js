const express = require('express');

const reservationController = require('../controller/reservation');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');

const router = express.Router();

router.get('/', isAuth, isAdmin, reservationController.getAllReservation);

router.post('/', isAuth, reservationController.reservate);

router.put('/:id', isAuth, isAdmin, reservationController.updateReservation);

router.delete('/:id', isAuth, isAdmin, reservationController.deleteReservation);

module.exports = router;
