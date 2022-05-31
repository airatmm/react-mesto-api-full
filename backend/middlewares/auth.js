const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = async (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    // при продакшене используем JWT_SECRET
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    req.userId = jwt.decode(token).id;
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};

// const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRmMzNkODA3ZDVhZDQ4ZTg3MGZhMyIsImlhdCI6MTY1MzkzMjY0NCwiZXhwIjoxNjU0NTM3NDQ0fQ.GdSzKwbLcuVlnwF9IZ_LWtlwxKDn-Ymzojzv2Qp9Ry0'; // вставьте сюда JWT, который вернул публичный сервер студента
// const SECRET_KEY_DEV = 'eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b'; // вставьте сюда секретный ключ для разработки из кода студента
// try {
//   const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
//   console.log('\x1b[31m%s\x1b[0m', `
// Надо исправить. В продакшне используется тот же
// секретный ключ, что и в режиме разработки.
// `);
// } catch (err) {
//   if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
//     console.log(
//       '\x1b[32m%s\x1b[0m',
//       'Всё в порядке. Секретные ключи отличаются',
//     );
//   } else {
//     console.log(
//       '\x1b[33m%s\x1b[0m',
//       'Что-то не так',
//       err,
//     );
//   }
// }
