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

exports.getAllReservation = async (req, res, next) => {
  try {
    let reservations = [];
    let reservationParams = {};
    if (req.query.search) {
      reservationParams = {
        ...reservationParams,
        $text: { $search: req.query.search },
      };
    }
    const totalItems = await Reservation.find(
      reservationParams
    ).countDocuments();
    if (req.query.page) {
      const currentPage = req.query.page;
      const perPage = 5;
      reservations = await Reservation.find(reservationParams)
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    } else {
      reservations = await Reservation.find(reservationParams);
    }
    res.status(httpStatus.OK).json({
      message: 'Fetched reservations successfully',
      reservations: reservations,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.deleteReservation = async (req, res, next) => {
  try {
    const id = req.params.id;
    const reservation = await Reservation.findByIdAndRemove(id);
    res.status(httpStatus.OK).json({
      message: 'Delete reservation successfully',
      reservation: reservation,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.updateReservation = async (req, res, next) => {
  try {
    const reservationId = req.params.id;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const quantity = req.body.quantity;
    const bookingDate = req.body.bookingDate;
    const bookingTime = req.body.bookingTime;
    const status = req.body.status;
    const reservation = await Reservation.findById(reservationId);
    reservation.name = name;
    reservation.quantity = quantity;
    reservation.phoneNumber = phoneNumber;
    reservation.bookingDate = bookingDate;
    reservation.bookingTime = bookingTime;
    reservation.status = status;
    const updatedReservation = await reservation.save();
    res.status(httpStatus.OK).json({
      message: 'Update reservation successfully',
      reservation: updatedReservation,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
