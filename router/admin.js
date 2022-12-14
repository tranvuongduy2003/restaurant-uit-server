const express = require('express');

const adminController = require('../controller/admin');
const isAdmin = require('../middleware/is-admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/user', isAuth, isAdmin, adminController.getUsers);

router.get('/user/bin', isAuth, isAdmin, adminController.getDeletedUser);

router.delete(
  '/user/bin/:id',
  isAuth,
  isAdmin,
  adminController.deleteUserPermanently
);

router.put('/user/:id', isAuth, isAdmin, adminController.editUser);

router.delete('/user/:id', isAuth, isAdmin, adminController.deleteUser);

router.post('/user/:id', isAuth, isAdmin, adminController.recoverUser);

router.post('/food', isAuth, isAdmin, adminController.postCreateFood);

router.put('/food/:foodId', isAuth, isAdmin, adminController.updateFood);

router.delete('/food/:foodId', isAuth, isAdmin, adminController.deleteFood);

router.post('/food/:id', isAuth, isAdmin, adminController.recoverFood);

router.delete(
  '/food/bin/:foodId',
  isAuth,
  isAdmin,
  adminController.deleteFoodPermanently
);

router.post('/category', isAuth, isAdmin, adminController.postCreateCategory);

router.post('/category/:id', isAuth, isAdmin, adminController.recoverCategory);

router.put(
  '/category/:categoryId',
  isAuth,
  isAdmin,
  adminController.updateCategory
);

router.delete(
  '/category/:categoryId',
  isAuth,
  isAdmin,
  adminController.deleteCategory
);

router.delete(
  '/category/bin/:categoryId',
  isAuth,
  isAdmin,
  adminController.deleteCategoryPermanently
);

router.get('/roles', adminController.getRoles);

router.put('/roles/:id', adminController.updateRole);

module.exports = router;
