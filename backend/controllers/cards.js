const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCard = async (req, res, next) => {
  try {
    const cards = await Card.find({}).populate('owner').exec();
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const owner = req.userId;
    const { name, link } = req.body;
    const card = new Card({ name, link, owner });
    res.status(201).send(await card.save());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Поля должны быть заполнены'));
      return;
    }
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const cardById = await Card.findById(cardId);
    if (!cardById) {
      next(new NotFoundError('Нет карточки с таким id'));
      return;
    }
    const cardOwner = cardById.owner.toString();
    if (cardOwner !== req.userId) {
      next(new ForbiddenError('Нельзя удалить чужие карточки'));
      return;
    }
    const cardDelete = await Card.findByIdAndDelete(cardById);
    res.status(200).send(cardDelete);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректный id карточки'));
      return;
    }
    next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.userId } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!like) {
      next(new NotFoundError('Нет карточки с таким'));
      return;
    }
    res.status(200).send(like);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректный id карточки'));
      return;
    }
    next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.userId } }, // убрать _id из массива
      { new: true },
    );
    if (!like) {
      next(new NotFoundError('Нет карточки с таким id'));
      return;
    }
    res.status(200).send(like);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Некорректный id карточки'));
      return;
    }
    next(err);
  }
};

module.exports = {
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
