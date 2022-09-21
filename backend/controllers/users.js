const { userModel } = require('../models/user');
const { handleError } = require('./errors');
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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

const getCurrentUser = (req, res) => {
  const currentUserId = req.user; 
  userModel.findById(currentUserId)
  .orFail()
  .then((user) => res.send({data: user}))
  .catch((err => handleError(err, res)))
}

const createUser = (req, res) => {
  const { name, about, avatar, email, password} = req.body;
  bcyrpt.hash(password, 10)
  .then(hash => {
    userModel
    .create({ name, about, avatar, email, password: hash })
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => handleError(err, res));
};

const login = (req, res) => {
  const { email, password } = req.body; 
  userModel.findOne({email})
  User.findOne({ email })
  .then((user) => {
    if (!user) {
      return Promise.reject(
        new Error('Incorrect password or email'));
    }
    return bcrypt.compare(password, user.password)
      .then((authenticated) => {
          if (!authenticated) {
             return Promise.reject(new Error('bad cred'));
          }
          const token = jwt.sign({_id: user._id}, 'encoding-string', {
            expiresIn: '7d'
          })
          res.send({ name: user.name, email: user.email, token: jwt });
       })
   })
   .catch(err => handleError(err, res))
  }

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
  getCurrentUser,
  createUser,
  login, 
  updateProfile,
  updateAvatar,
}
