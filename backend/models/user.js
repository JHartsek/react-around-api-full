const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    validate: {
      validator: (link) => /https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]{1,256}\.[a-zA-Z0-9()]{1,6}([-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]*)/.test(
        link,
      ),
      message: 'invalid URL',
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'invalid email'
    }

  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const userModel = mongoose.model('user', userSchema);

module.exports = {
  userModel,
};
