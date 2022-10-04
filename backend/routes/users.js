const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../helpers/validateURL');

const {
  getAllUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

userRouter.get('/', (req, res, next) => {
  getAllUsers(req, res, next);
});

userRouter.get('/me', (req, res, next) => {
  getCurrentUser(req, res, next);
});

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
}), (req, res, next) => {
  getUserById(req, res, next);
});

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), (req, res, next) => {
  updateProfile(req, res, next);
});

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
}), (req, res, next) => {
  updateAvatar(req, res, next);
});

module.exports = userRouter;
