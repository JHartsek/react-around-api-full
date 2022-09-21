const cardRouter = require('express').Router();
const {
  getAllCards, createCard, likeCard, unlikeCard, deleteCard,
} = require('../controllers/cards');

cardRouter.get('/', (req, res) => {
  getAllCards(req, res);
});

cardRouter.post('/', (req, res) => {
  createCard(req, res);
});

cardRouter.put('/:cardId/likes', (req, res) => {
  likeCard(req, res);
});

cardRouter.delete('/:cardId/likes', (req, res) => {
  unlikeCard(req, res);
});

cardRouter.delete('/:cardId', (req, res) => {
  deleteCard(req, res);
});

module.exports = cardRouter;
