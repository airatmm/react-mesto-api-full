const express = require('express');

const users = express.Router();

const {
  validateUserUpdate,
  validateAvatarUpdate,
  validateParamsUserById,
} = require('../validator/validator');
const {
  getUsers,
  getUserByID,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

users.get('/users', getUsers);
users.get('/users/me', getCurrentUser);
users.get('/users/:userId', validateParamsUserById, getUserByID);
users.patch('/users/me', validateUserUpdate, updateUser);
users.patch('/users/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = {
  users,
};
