const Product = require('../models/product');
const { httpStatus } = require('../utils/httpStatus');

exports.getProducts = async (req, res, next) => {
  try {
    const totalItems = await Product.find().countDocuments();
    const products = await Product.find();
    res.status(httpStatus.OK).json({
      message: 'Fetched products successfully',
      products: products,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
