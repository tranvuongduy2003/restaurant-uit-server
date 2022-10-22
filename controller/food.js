const Food = require('../models/food');
const { httpStatus } = require('../utils/httpStatus');

exports.getFoods = async (req, res, next) => {
  try {
    let foods = [];
    const totalItems = await Food.find().countDocuments();
    if (req.query.page) {
      const currentPage = req.query.page;
      const perPage = 5;
      foods = await Food.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    } else {
      foods = await Food.find();
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

exports.getSearchFoods = async (req, res, next) => {
  try {
    const name = req.query.name;
    if (name !== '') {
      const totalItems = await Food.find({
        $text: { $search: name },
      }).countDocuments();
      const foods = await Food.find({ $text: { $search: name } });
      res.status(httpStatus.OK).json({
        message: 'Search food successfully',
        foods: foods,
        totalItems: totalItems,
      });
    } else {
      const totalItems = await Food.find().countDocuments();
      const foods = await Food.find();
      res.status(httpStatus.OK).json({
        message: 'Fetched foods successfully',
        foods: foods,
        totalItems: totalItems,
      });
    }
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.updateFood = async (req, res, next) => {
  try {
    const foodId = req.params.foodId;
    const name = req.body.name;
    const categoryId = req.body.categoryId;
    const price = req.body.price;
    // const images = req.body.images;
    // const posterImage = images[0];
    const description = req.body.description;
    const bestDeals = req.body.bestDeals;
    const popular = req.body.popular;
    const food = await Food.findById(foodId);
    food.name = name;
    food.categoryId = categoryId;
    food.price = price;
    food.description = description;
    food.bestDeals = bestDeals;
    food.popular = popular;
    const updatedFood = await food.save();
    res.status(httpStatus.OK).json({
      message: 'Food updaded',
      food: updatedFood,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.deleteFood = async (req, res, next) => {
  try {
    const foodId = req.params.foodId;
    const food = await Food.findByIdAndRemove(foodId);
    res.status(httpStatus.OK).json({
      message: 'Delete food successfully',
      food: food,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
