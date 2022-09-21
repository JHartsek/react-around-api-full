const { cardModel } = require('../models/card');
const { handleError } = require('./errors');

const getAllCards = (req, res) => {
  cardModel
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => handleError(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cardModel
    .create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

const likeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

const unlikeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => handleError(err, res));
};

const deleteCard = (req, res) => {
  cardModel
    .findByIdAndRemove(req.params.cardId)
    .orFail()
    .then(() => res.send({ message: 'Card deleted' }))
    .catch((err) => handleError(err, res));
};

module.exports = {
  getAllCards,
  createCard,
  likeCard,
  unlikeCard,
  deleteCard,
};
