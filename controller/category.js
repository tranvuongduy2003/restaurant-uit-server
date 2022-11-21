const Category = require('../models/category');
const { httpStatus } = require('../utils/httpStatus');

exports.getCategories = async (req, res, next) => {
  try {
    let categories = [];
    let categoryParams = {};
    if (req.query.search) {
      categoryParams = {
        ...categoryParams,
        $text: { $search: req.query.search },
      };
    }
    const totalItems = await Category.find(categoryParams).countDocuments();
    if (req.query.page) {
      const currentPage = req.query.page;
      const perPage = 5;
      categories = await Category.find(categoryParams)
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    } else {
      categories = await Category.find(categoryParams);
    }
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

exports.getCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    res.status(httpStatus.OK).json({
      message: 'Fetched category successfully',
      category: category,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.getPopular = async (req, res, next) => {
  try {
    const totalItems = await Category.find({ popular: true }).countDocuments();
    const popular = await Category.find({ popular: true });
    res.status(httpStatus.OK).json({
      message: 'Fetched popular category successfully',
      categories: popular,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
