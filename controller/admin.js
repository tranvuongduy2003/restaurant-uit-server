const Food = require('../models/food');
const Role = require('../models/role');
const Category = require('../models/category');
const User = require('../models/user');
const { httpStatus } = require('../utils/httpStatus');

exports.postCreateFood = async (req, res, next) => {
  try {
    const role = req.role;
    if (!role || !role.add) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

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
    const role = req.role;
    if (!role || !role.edit) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

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
    const role = req.role;
    if (!role || !role.delete) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

    const foodId = req.params.foodId;
    const food = await Food.findByIdAndRemove(foodId);
    const category = await Category.findOne({ _id: food.categoryId });
    const newFoods = category.foods.filter(
      (item) => item._id.toString() !== food._id.toString()
    );
    console.log(
      '🚀 ~ file: admin.js:103 ~ exports.deleteFood ~ newFoods',
      newFoods
    );
    await Category.findByIdAndUpdate(
      { _id: food.categoryId },
      { foods: newFoods }
    );
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

exports.postCreateCategory = async (req, res, next) => {
  try {
    const role = req.role;
    if (!role || !role.add) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

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
    const role = req.role;
    if (!role || !role.edit) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

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
    const role = req.role;
    if (!role || !role.delete) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);

    if (category.foods && category.foods.length > 0) {
      return res.status(httpStatus.FORBIDDEN).json({
        message: 'Cannot delete category',
      });
    }
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

exports.getUsers = async (req, res, next) => {
  try {
    const role = req.role;
    if (!role || !role.read) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

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
    const role = req.role;
    if (!role || !role.edit) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

    const userId = req.params.id;
    const avatar = req.body.avatar;
    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;
    const edittedRole = req.body.role;

    const user = await User.findOne({ _id: userId });
    user.avatar = avatar;
    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.address = address;
    user.role = edittedRole;

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
    const role = req.role;
    if (!role || !role.delete) {
      const error = new Error('Bạn không có quyền truy cập chức năng này');
      error.statusCode = httpStatus.FORBIDDEN;
      throw error;
    }

    const userId = req.params.id;
    const user = await User.findByIdAndRemove(userId);
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

exports.getRoles = async (req, res, next) => {
  try {
    let roles = [];
    let roleParams = {};
    // if (req.query.search) {
    //   roleParams = { ...roleParams, $text: { $search: req.query.search } };
    // }
    const totalItems = await Role.find(roleParams).countDocuments();
    if (req.query.page) {
      const currentPage = req.query.page;
      const perPage = 5;
      roles = await Role.find(roleParams)
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    } else {
      roles = await Role.find(roleParams);
    }
    res.status(httpStatus.OK).json({
      message: 'Get all roles successfully',
      roles: roles,
      totalItems: totalItems,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.createRole = async (req, res, next) => {
  try {
    const name = req.body.name;
    const read = req.body.read;
    const add = req.body.add;
    const deleteRole = req.body.delete;
    const edit = req.body.edit;

    const role = new Role({
      name: name,
      read: read,
      add: add,
      delete: deleteRole,
      edit: edit,
    });

    await role.save();

    res.status(httpStatus.OK).json({
      message: 'Create role successfully',
      role: role,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const read = req.body.read;
    const edit = req.body.edit;
    const add = req.body.add;
    const roleDelete = req.body.delete;

    const role = await Role.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        read: read,
        edit: edit,
        add: add,
        delete: roleDelete,
      }
    );

    res.status(httpStatus.OK).json({
      message: 'Update role successfully',
      role: role,
    });
  } catch (error) {
    if (!error) {
      error.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    }
    next(error);
  }
};
