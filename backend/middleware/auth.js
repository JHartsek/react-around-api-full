const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authorization failed');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'encoding-string');
  } catch (err) {
    throw new UnauthorizedError('Authorization failed');
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};
