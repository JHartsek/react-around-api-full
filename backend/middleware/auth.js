const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization failed' });
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'encoding-string');
  } catch (err) {
    return res.status(403).send({ message: 'Unauthorized action!' });
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};
