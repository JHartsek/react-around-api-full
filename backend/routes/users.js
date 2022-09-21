const userRouter = require('express').Router();
const {
  getAllUsers, getUserById, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

userRouter.get('/', (req, res) => {
  getAllUsers(req, res);
});

userRouter.get('/:userId', (req, res) => {
  getUserById(req, res);
});

userRouter.patch('/me', (req, res) => {
  updateProfile(req, res);
});

userRouter.patch('/me/avatar', (req, res) => {
  updateAvatar(req, res);
});

module.exports = userRouter;
