const Food = require('../models/food');
const { httpStatus } = require('../utils/httpStatus');

exports.getFoods = async (req, res, next) => {
  try {
    const totalItems = await Food.find().countDocuments();
    const foods = await Food.find();
    res.status(httpStatus.OK).json({
      message: 'Fetched foods successfully',
      foods: foods,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
