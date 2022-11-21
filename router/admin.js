const express = require('express');

const adminController = require('../controller/admin');
const isAdmin = require('../middleware/is-admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/user', isAuth, isAdmin, adminController.getUsers);

router.post('/food', isAuth, isAdmin, adminController.postCreateFood);

router.put('/food/:foodId', isAuth, isAdmin, adminController.updateFood);

router.delete('/food/:foodId', isAuth, isAdmin, adminController.deleteFood);

router.post('/category', isAuth, isAdmin, adminController.postCreateCategory);

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

module.exports = router;
