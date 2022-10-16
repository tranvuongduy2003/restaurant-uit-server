const Category = require('../models/category');
const { httpStatus } = require('../utils/httpStatus');

exports.getCategories = async (req, res, next) => {
  try {
    const totalItems = await Category.find().countDocuments();
    const categories = await Category.find();
    res.status(httpStatus.OK).json({
      message: 'Fetched categories successfully',
      categories: categories,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
