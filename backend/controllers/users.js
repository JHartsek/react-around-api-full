const { userModel } = require('../models/user');
const bcyrpt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const getAllUsers = (req, res, next) => {
  userModel
    .find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

const getUserById = (req, res, next) => {
  userModel
    .findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

const getCurrentUser = (req, res, next) => {
  const currentUserId = req.user; 
  userModel.findById(currentUserId)
  .orFail()
  .then((user) => res.send({data: user}))
  .catch((err) => next(err));
}

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password} = req.body;
  bcyrpt.hash(password, 10)
  .then(hash => {
    userModel
    .create({ name, about, avatar, email, password: hash })
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body; 
  userModel.findOne({email}).select('+password')
  .then((user) => {
    if (!user) {
      return Promise.reject(
        new Error('Incorrect password or email'));
    }
    return bcrypt.compare(password, user.password)
      .then((authenticated) => {
          if (!authenticated) {
             return Promise.reject(new Error('bad credentials'));
          }
          const token = jwt.sign({_id: user._id}, 'encoding-string', {
            expiresIn: '7d'
          })
          res.send({ name: user.name, email: user.email, token });
       })
   })
   .catch(err => next(err)); 
  }

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => res.send({ data: user }))
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
    .then((user) => res.send({ data: user }))
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
}
