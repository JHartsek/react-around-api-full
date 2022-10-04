const { ResourceNotFoundError } = require('../errors/ResourceNotFoundError');
const { ForbiddenActionError } = require('../errors/ForbiddenActionError');
const { cardModel } = require('../models/card');

const getAllCards = (req, res, next) => {
  cardModel
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cardModel
    .create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => next(new BadRequestError('Invalid data submitted')));
};

const likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      err.name === 'DocumentNotFoundError' ? next(new ResourceNotFoundError('Could not find requested card')) : next(err)
    })
};

const unlikeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      err.name === 'DocumentNotFoundError' ? next(new ResourceNotFoundError('Could not find requested card')) : next(err)
    })
};

const deleteCard = (req, res, next) => {
  let selectedCardOwner;
  cardModel.findById(req.params.cardId)
    .then((card) => {
      selectedCardOwner = card.owner.toString();
      if (req.user._id === selectedCardOwner) {
        cardModel
          .findByIdAndRemove(req.params.cardId)
          .orFail()
          .then(() => res.send({ message: 'Card deleted' }));
      }
      throw new ForbiddenActionError(`Cannot delete another user's cards`);
    })
    .catch((err) => {
      err.name === 'DocumentNotFoundError' ? next(new ResourceNotFoundError('Could not find requested card')) : next(err)
    })
};

module.exports = {
  getAllCards,
  createCard,
  likeCard,
  unlikeCard,
  deleteCard,
};
