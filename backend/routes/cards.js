const express = require('express');

const cards = express.Router();

const {
  validateCard,
  validateParamsCardById,
} = require('../validator/validator');

const {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cards.get('/cards', getCard);
cards.post('/cards', validateCard, createCard);
cards.delete('/cards/:cardId', validateParamsCardById, deleteCard);
cards.put('/cards/:cardId/likes', validateParamsCardById, likeCard);
cards.delete('/cards/:cardId/likes', validateParamsCardById, dislikeCard);

module.exports = {
  cards,
};
