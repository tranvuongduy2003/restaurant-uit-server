const express = require('express');

const reservationController = require('../controller/reservation');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const checkRole = require('../middleware/check-role');

const router = express.Router();

router.get(
  '/',
  isAuth,
  checkRole.checkBookingRole,
  reservationController.getAllReservation
);

router.post(
  '/',
  isAuth,
  checkRole.checkBookingRole,
  reservationController.reservate
);

router.put(
  '/:id',
  isAuth,
  checkRole.checkBookingRole,
  reservationController.updateReservation
);

router.delete(
  '/:id',
  isAuth,
  checkRole.checkBookingRole,
  reservationController.deleteReservation
);

module.exports = router;
