const express = require('express');

const reservationController = require('../controller/reservation');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const checkRole = require('../middleware/check-role');

const router = express.Router();

router.get(
  '/',
  isAuth,
  checkRole.checkOrderRole,
  reservationController.getAllReservation
);

router.post(
  '/',
  isAuth,
  checkRole.checkOrderRole,
  reservationController.reservate
);

router.put(
  '/:id',
  isAuth,
  checkRole.checkOrderRole,
  reservationController.updateReservation
);

router.delete(
  '/:id',
  isAuth,
  checkRole.checkOrderRole,
  reservationController.deleteReservation
);

module.exports = router;
