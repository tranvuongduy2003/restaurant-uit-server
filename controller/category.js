const Category = require('../models/category');
const { httpStatus } = require('../utils/httpStatus');

exports.getCategories = (req, res, next) => {
  try {
    const totalItems = Category.find().countDocuments();
    const categories = Category.find();
    res.status(httpStatus.OK).json({
      message: 'Fetched categories successfully',
      categories: categories,
      totalItems: totalItems,
    });
  } catch (error) {}
};
