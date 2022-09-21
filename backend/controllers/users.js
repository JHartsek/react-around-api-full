const { userModel } = require('../models/user');
const { handleError } = require('./errors');
const bcyrpt = require('bcryptjs');

const getAllUsers = (req, res) => {
  userModel
    .find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(err, res));
};

const getUserById = (req, res) => {
  userModel
    .findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password} = req.body;
  bcyrpt.hash(password, 10)
  .then(hash => {
    userModel
    .create({ name, about, avatar, email, hash })
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};
