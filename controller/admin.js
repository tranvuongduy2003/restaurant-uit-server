const Food = require('../models/food');
const Category = require('../models/category');
const { httpStatus } = require('../utils/httpStatus');

exports.postCreateFood = async (req, res, next) => {
  try {
    console.log(req.body);
    const name = req.body.name;
    const categoryId = req.body.categoryId;
    const price = req.body.price;
    const images = req.body.images;
    const posterImage = images[0];
    const description = req.body.description;
    const bestDeals = req.body.bestDeals;
    const popular = req.body.popular;
    const food = new Food({
      name,
      categoryId,
      price,
      images,
      posterImage,
      description,
      bestDeals,
      popular,
    });
    await food.save();
    res.status(httpStatus.CREATED).json({
      message: 'Food created successfully',
      food: food,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.postCreateCategory = async (req, res, next) => {
  try {
    const name = req.body.name;
    const image = req.body.image;
    const foods = [];
    const category = new Category({
      name,
      image,
      foods,
    });
    await category.save();
    res.status(httpStatus.CREATED).json({
      message: 'Category created successfully',
      category: category,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
