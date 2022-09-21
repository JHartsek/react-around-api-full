const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (link) => /https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]{1,256}\.[a-zA-Z0-9()]{1,6}([-a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=]*)/.test(
        link,
      ),
      message: 'invalid URL',
    },
  },
  email: {
    type: String, 
    required: true,
    unique: true, 
    validator: (email) => validator.isEmail(email)
  }, 
  password: {
    type: String, 
    required: true, 
  }
});

const userModel = mongoose.model('user', userSchema);

module.exports = {
  userModel,
};
