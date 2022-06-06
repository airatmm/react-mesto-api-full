const { celebrate, Joi } = require('celebrate');

const regLink = /(http|https):\/\/(www)?\.?([A-Za-z0-9.-]+)\.([A-z]{2,})((?:\/[+~%/.\w-_]*)?\??(?:[-=&;%@.\w_]*)#?(?:[\w]*))?/;

// USERS
// post /signup createUser
const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(regLink),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// post /signin login
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// path /users/me updateUser
const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

// path /users/me/avatar updateAvatar
const validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regLink).required(),
  }),
});

// get /users/:userId getUserByID
const validateParamsUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
});

// CARDS
// post /cards createCards
const validateCard = celebrate({
  body: Joi.object().keys({
    link: Joi.string().regex(regLink).required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

// delete /cards/:cardId deleteCard
// delete /cards/:cardId/likes dislikeCard
// put /cards/:cardId/likes likeCard
const validateParamsCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateUser,
  validateLogin,
  validateUserUpdate,
  validateAvatarUpdate,
  validateParamsUserById,
  validateCard,
  validateParamsCardById,
};
