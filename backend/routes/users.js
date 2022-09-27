const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../helpers/validateURL');

const {
  getAllUsers, getUserById, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

userRouter.get('/', (req, res) => {
  getAllUsers(req, res);
});

userRouter.get('/me', (req, res) => {
  getCurrentUser(req, res);
})

userRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24)
  })
}), (req, res) => {
  getUserById(req, res);
});

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30)
  })
}), (req, res) => {
  updateProfile(req, res);
});

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  })
}), (req, res) => {
  updateAvatar(req, res);
});

module.exports = userRouter;
