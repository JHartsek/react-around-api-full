const { cardModel } = require('../models/card');

const getAllCards = (req, res, next) => {
  cardModel
    .find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cardModel
    .create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

const likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

const unlikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

const deleteCard = (req, res, next) => {
  const selectedCard = cardModel.findById(req.params.cardId);
  const selectedCardOwner = selectedCard.owner;

  if(req.user === selectedCardOwner) {
    cardModel
    .findByIdAndRemove(req.params.cardId)
    .orFail()
    .then(() => res.send({ message: 'Card deleted' }))
    .catch((err) => next(err));
  }
  else {
    res.status(403).send({ message: 'Unauthorized action' })
  }
};

module.exports = {
  getAllCards,
  createCard,
  likeCard,
  unlikeCard,
  deleteCard,
};
