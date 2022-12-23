const Reservation = require('../models/reservation');
const status = require('../utils/status');
const httpStatus = require('../utils/httpStatus');

exports.reservate = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const bookingDate = req.body.bookingDate;
    const bookingTime = req.body.bookingTime;
    const quantity = req.body.quantity;

    const reservation = new Reservation();
    reservation.userId = userId;
    reservation.name = name;
    reservation.phoneNumber = phoneNumber;
    reservation.bookingDate = bookingDate;
    reservation.bookingTime = bookingTime;
    reservation.quantity = quantity;
    reservation.status = status.PENDING;

    await reservation.save();

    res.status(httpStatus.OK).json({
      message: 'Reservate successfully!',
      reservation: reservation,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
