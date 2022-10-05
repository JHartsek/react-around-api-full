const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ResourceNotFoundError } = require('../errors/ResourceNotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ConflictError } = require('../errors/ConflictError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { userModel } = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const getAllUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  userModel
    .findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      err.name === 'DocumentNotFoundError' ? next(new ResourceNotFoundError('Could not find requested user')) : next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const currentUserId = req.user;
  userModel.findById(currentUserId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  userModel.findOne({ email }).select('+password')
    .then((account) => {
      if (account) {
        return Promise.reject(new ConflictError('Duplicate email'));
      }
      bcrypt.hash(password, 10)
        .then((hash) => {
          userModel
            .create({
              email, password: hash,
            })
            .then((user) => res.send({ email: user.email }))
            .catch((err) => next(new BadRequestError('Invalid data submitted')));
        });
    })
    .catch((err) => {
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let user;
  userModel.findOne({ email }).select('+password')
    .then((account) => {
      if (!account) {
        return Promise.reject(
          new UnauthorizedError('Incorrect email or password'),
        );
      }
      user = account;
      return bcrypt.compare(password, user.password);
    })
    .then((authenticated) => {
      if (!authenticated) {
        return Promise.reject(new UnauthorizedError('Incorrect email or password'));
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'encoding-string',
        { expiresIn: '7d' },
      );
      res.send({ name: user.name, email: user.email, token });
    })
    .catch((err) => next(err));
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports = {
  getAllUsers,
  getUserById,
  getCurrentUser,
  createUser,
  login,
  updateProfile,
  updateAvatar,
};
