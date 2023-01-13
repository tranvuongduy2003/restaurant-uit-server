const Food = require('../models/food');
const Category = require('../models/category');
const { httpStatus } = require('../utils/httpStatus');
const { roleStatus } = require('../utils/role');

exports.getFoods = async (req, res, next) => {
  try {
    const role = req.role;
    if (!role || !role.read) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

    let foods = [];
    let foodParams = {};
    if (req.query.category) {
      foodParams = { ...foodParams, categoryId: req.query.category };
    }
    if (req.query.search) {
      foodParams = { ...foodParams, $text: { $search: req.query.search } };
    }
    const totalItems = await Food.find(foodParams).countDocuments();
    if (req.query.page) {
      const currentPage = req.query.page;
      const perPage = 5;
      foods = await Food.find(foodParams)
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    } else {
      foods = await Food.find(foodParams);
    }
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

exports.getFood = async (req, res, next) => {
  try {
    const role = req.role;
    if (!role || !role.read) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

    const foodId = req.params.foodId;
    const food = await Food.findById(foodId);
    res.status(httpStatus.OK).json({
      message: 'Fetched food successfully',
      food: food,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.getBestDeals = async (req, res, next) => {
  try {
    const role = req.role;
    if (!role || !role.read) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

    const totalItems = await Food.find({ bestDeals: true }).countDocuments();
    const bestDeals = await Food.find({ bestDeals: true });
    res.status(httpStatus.OK).json({
      message: 'Fetched best deals successfully',
      foods: bestDeals,
      totalItems: totalItems,
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
    const role = req.role;
    if (!role || !role.read) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

    const totalItems = await Food.find({ popular: true }).countDocuments();
    const popular = await Food.find({ popular: true });
    res.status(httpStatus.OK).json({
      message: 'Fetched popular food successfully',
      foods: popular,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
