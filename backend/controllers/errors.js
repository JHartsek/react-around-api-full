const handleError = (err, res) => {
  let ERROR_CODE;
  let ERROR_MESSAGE;

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    ERROR_CODE = 400;
    ERROR_MESSAGE = 'Invalid data submitted';
  } else if (err.name === 'DocumentNotFoundError') {
    ERROR_CODE = 404;
    ERROR_MESSAGE = 'Requested resource not found';
  } else {
    ERROR_CODE = 500;
    ERROR_MESSAGE = 'An error has occurred on the server';
  }

  res.status(ERROR_CODE).send({ message: `${ERROR_MESSAGE}` });
};

module.exports = {
  handleError,
};
