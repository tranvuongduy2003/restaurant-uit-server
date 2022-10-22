const Food = require('../models/food');
const Category = require('../models/category');
const { httpStatus } = require('../utils/httpStatus');

exports.postCreateFood = async (req, res, next) => {
  try {
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
    const category = await Category.findById(categoryId);
    category.foods = [...category.foods, food._id];
    await category.save();
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
    const imageRef = req.body.imageRef;
    const popular = req.body.popular;
    const foods = [];
    const category = new Category({
      name,
      image,
      imageRef,
      popular,
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
