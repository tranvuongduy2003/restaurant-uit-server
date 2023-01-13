const express = require('express');

const adminController = require('../controller/admin');
const isAdmin = require('../middleware/is-admin');
const isAuth = require('../middleware/is-auth');
const checkRole = require('../middleware/check-role');

const router = express.Router();

router.get('/user', isAuth, checkRole.checkUserRole, adminController.getUsers);

router.put(
  '/user/:id',
  isAuth,
  checkRole.checkUserRole,
  adminController.editUser
);

router.delete(
  '/user/:id',
  isAuth,
  checkRole.checkUserRole,
  adminController.deleteUser
);

router.post(
  '/food',
  isAuth,
  checkRole.checkFoodRole,
  adminController.postCreateFood
);

router.put(
  '/food/:foodId',
  isAuth,
  checkRole.checkFoodRole,
  adminController.updateFood
);

router.delete(
  '/food/:foodId',
  isAuth,
  checkRole.checkFoodRole,
  adminController.deleteFood
);

router.post(
  '/category',
  isAuth,
  checkRole.checkCategoryRole,
  adminController.postCreateCategory
);

router.put(
  '/category/:categoryId',
  isAuth,
  checkRole.checkCategoryRole,
  adminController.updateCategory
);

router.delete(
  '/category/:categoryId',
  isAuth,
  checkRole.checkCategoryRole,
  adminController.deleteCategory
);

router.get('/roles', isAuth, isAdmin, adminController.getRoles);

router.post('/roles', isAuth, isAdmin, adminController.createRole);

router.put('/roles/:id', isAuth, isAdmin, adminController.updateRole);

module.exports = router;
