const Category = require('../models/category');
const { httpStatus } = require('../utils/httpStatus');

exports.getCategories = async (req, res, next) => {
  try {
    let categories = [];
    const totalItems = await Category.find().countDocuments();
    if (req.query.page) {
      const currentPage = req.query.page;
      const perPage = 5;
      categories = await Category.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    } else {
      categories = await Category.find();
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

exports.getSearchCategories = async (req, res, next) => {
  try {
    const name = req.query.name;
    if (name !== '') {
      const totalItems = await Category.find({
        $text: { $search: name },
      }).countDocuments();
      const categories = await Category.find({
        $text: { $search: name },
      });
      res.status(httpStatus.OK).json({
        message: 'Search category successfully',
        categories: categories,
        totalItems: totalItems,
      });
    } else {
      const totalItems = await Category.find().countDocuments();
      const categories = await Category.find();
      res.status(httpStatus.OK).json({
        message: 'Fetched categories successfully',
        categories: categories,
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

exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const name = req.body.name;
    const popular = req.body.popular;
    // const image = req.body.image;
    const category = await Category.findById(categoryId);
    category.name = name;
    category.popular = popular;
    const updatedCategory = await category.save();
    res.status(httpStatus.OK).json({
      message: 'Update category successfully',
      category: updatedCategory,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findByIdAndRemove(categoryId);
    res.status(httpStatus.OK).json({
      message: 'Delete category successfully',
      category: category,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
