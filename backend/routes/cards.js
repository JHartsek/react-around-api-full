const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../helpers/validateURL');

const {
  getAllCards, createCard, likeCard, unlikeCard, deleteCard,
} = require('../controllers/cards');

cardRouter.get('/', (req, res, next) => {
  getAllCards(req, res, next);
});

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
}), (req, res, next) => {
  createCard(req, res, next);
});

cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), (req, res, next) => {
  likeCard(req, res, next);
});

cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), (req, res, next) => {
  unlikeCard(req, res, next);
});

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), (req, res, next) => {
  deleteCard(req, res, next);
});

module.exports = cardRouter;
