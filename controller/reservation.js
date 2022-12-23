const Reservation = require('../models/reservation');
const { httpStatus } = require('../utils/httpStatus');
const { status } = require('../utils/status');

exports.reservate = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const bookingDate = req.body.bookingDate;
    const bookingTime = req.body.bookingTime;
    const quantity = req.body.quantity;

    const reservation = new Reservation({
      userId,
      name,
      phoneNumber,
      bookingDate,
      bookingTime,
      quantity,
      status: status.PENDING,
    });

    await reservation.save();

    res.status(httpStatus.CREATED).json({
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
