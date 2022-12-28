const Food = require('../models/food');
const DeletedFood = require('../models/deleted-food');
const Category = require('../models/category');
const DeletedCategory = require('../models/deleted-category');
const User = require('../models/user');
const DeletedUser = require('../models/deleted-user');
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

exports.updateFood = async (req, res, next) => {
  try {
    const foodId = req.params.foodId;
    const name = req.body.name;
    const categoryId = req.body.categoryId;
    const price = req.body.price;
    const images = req.body.images;
    const posterImage = images[0];
    const description = req.body.description;
    const bestDeals = req.body.bestDeals;
    const popular = req.body.popular;
    const food = await Food.findById(foodId);
    food.name = name;
    food.categoryId = categoryId;
    food.price = price;
    food.images = images;
    food.posterImage = posterImage;
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
    const deletedFood = new DeletedFood({
      name: food.name,
      categoryId: food.categoryId || '',
      price: food.price,
      images: food.images,
      posterImage: food.posterImage,
      description: food.description,
      bestDeals: food.bestDeals,
      popular: food.popular,
    });
    if (deletedFood.categoryId !== '') {
      const category = await Category.findById(food.categoryId);
      const foodIndex = category?.foods.findIndex(
        (item) => item._id === food._id
      );
      category?.foods.splice(foodIndex, 1);
      await category?.save();
    }
    await deletedFood.save();
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

exports.deleteFoodPermanently = async (req, res, next) => {
  try {
    const foodId = req.params.foodId;
    const food = await DeletedFood.findByIdAndRemove(foodId);
    res.status(httpStatus.OK).json({
      message: 'Delete food permanently',
      food: food,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.recoverFood = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedFood = await DeletedFood.findByIdAndRemove(id);

    const categoryId = deletedFood.categoryId;
    if (categoryId) {
      const category = await Category.findOne({ _id: categoryId });
      category.foods.push(deletedFood._id);
      await category.save();
    }

    const recoverFood = new Food({
      name: deletedFood.name,
      categoryId: deletedFood.categoryId || '',
      price: deletedFood.price,
      images: deletedFood.images,
      posterImage: deletedFood.posterImage,
      description: deletedFood.description,
      bestDeals: deletedFood.bestDeals,
      popular: deletedFood.popular,
    });

    await recoverFood.save();

    res.status(httpStatus.OK).json({
      message: 'Recover food successfully',
      food: recoverFood,
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
    const category = await Category.findById(categoryId);
    // const foods = await Food.find({ categoryId: category._id });
    // foods.map((food) => ({ ...food, categoryId: '' }));
    // await foods.save();
    Food.updateMany(
      { categoryId: category._id },
      {
        $set: {
          categoryId: '',
        },
      }
    );
    const deletedCategory = new DeletedCategory({
      name: category.name,
      image: category.image,
      imageRef: category.imageRef,
      popular: category.popular,
      foods: category.foods,
    });
    await deletedCategory.save();
    await category.remove();
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

exports.deleteCategoryPermanently = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await DeletedCategory.findByIdAndRemove(categoryId);
    res.status(httpStatus.OK).json({
      message: 'Delete category permanently',
      category: category,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.recoverCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedCategory = DeletedCategory.findByIdAndRemove(id);

    const recoverCategory = new Category({
      name: deletedCategory.name,
      image: deletedCategory.image,
      imageRef: deletedCategory.imageRef,
      popular: deletedCategory.popular,
      foods: deletedCategory.foods,
    });

    recoverCategory.save();

    res.status(httpStatus.OK).json({
      message: 'Recover category successfully',
      category: recoverCategory,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    let users = [];
    let userParams = {};
    if (req.query.search) {
      userParams = {
        ...userParams,
        $text: { $search: req.query.search },
      };
    }
    const totalItems = await User.find(userParams).countDocuments();
    if (req.query.page) {
      const currentPage = req.query.page;
      const perPage = 5;
      users = await User.find(userParams)
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    } else {
      users = await User.find(userParams);
    }
    res.status(httpStatus.OK).json({
      message: 'Fetched users successfully',
      users: users,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.editUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatar = req.body.avatar;
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const role = req.body.role;

    const user = await User.findOne({ _id: userId });
    user.avatar = avatar;
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.address = address;
    user.role = role;

    const newUser = await user.save();

    res.status(httpStatus.OK).json({
      message: 'Update user successfully',
      user: newUser,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndRemove(userId);
    const deletedUser = new DeletedUser({
      avatar: user.avatar,
      email: user.email,
      password: user.password,
      name: user.name,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role,
      cart: user.cart,
    });
    await deletedUser.save();
    res.status(httpStatus.OK).json({
      message: 'Delete user successfully',
      user: user,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.deleteUserPermanently = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await DeletedUser.findByIdAndRemove(userId);
    res.status(httpStatus.OK).json({
      message: 'Delete user permanently',
      user: user,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.getDeletedUser = async (req, res, next) => {
  try {
    let users = [];
    let userParams = {};
    if (req.query.search) {
      userParams = {
        ...userParams,
        $text: { $search: req.query.search },
      };
    }
    const totalItems = await DeletedUser.find(userParams).countDocuments();
    if (req.query.page) {
      const currentPage = req.query.page;
      const perPage = 5;
      users = await DeletedUser.find(userParams)
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    } else {
      users = await DeletedUser.find(userParams);
    }
    res.status(httpStatus.OK).json({
      message: 'Fetched users successfully',
      users: users,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.recoverUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedUser = await DeletedUser.findByIdAndRemove(id);
    const recoverUser = new User({
      avatar: deletedUser.avatar,
      email: deletedUser.email,
      password: deletedUser.password,
      name: deletedUser.name,
      phoneNumber: deletedUser.phoneNumber,
      address: deletedUser.address,
      role: deletedUser.role,
      cart: deletedUser.cart,
    });
    await deletedUser.save();
    res.status(httpStatus.OK).json({
      message: 'Recover user successfully',
      user: recoverUser,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
