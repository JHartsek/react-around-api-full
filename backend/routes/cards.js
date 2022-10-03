const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../helpers/validateURL');

const {
  getAllCards, createCard, likeCard, unlikeCard, deleteCard,
} = require('../controllers/cards');

cardRouter.get('/', (req, res) => {
  getAllCards(req, res);
});

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
}), (req, res) => {
  createCard(req, res);
});

cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), (req, res) => {
  likeCard(req, res);
});

cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), (req, res) => {
  unlikeCard(req, res);
});

cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), (req, res) => {
  deleteCard(req, res);
});

module.exports = cardRouter;
