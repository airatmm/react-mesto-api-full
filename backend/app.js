const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT = 3000 } = process.env; // Слушаем 3000 порт
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const { login, createUser } = require('./controllers/users');
const { users } = require('./routes/users');
const { cards } = require('./routes/cards');
const { validateUser, validateLogin } = require('./validator/validator');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

// Массив разрешенных кросс-доменных запросов
const accessCors = [
  'https://mesto-project-36.nomoredomains.xyz',
  'http://mesto-project-36.nomoredomains.xyz',
  'http://localhost:3001',
];

const options = {
  origin: accessCors,
  method: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(options));

// подключаемся к серверу mongo
async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  app.use(helmet());

  app.use(cookieParser()); // подключаем парсер кук как мидлвэр

  app.get('/', (req, res) => {
    res.send(req.body);
  });

  // мидлвэр c методом express.json(),
  // встроенный в express для распознавания входящего объекта запроса как объекта JSON.
  app.use(express.json());

  // подключаем логгер запросов
  // Логгер запросов нужно подключить до всех обработчиков роутов
  app.use(requestLogger);

  app.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  });

  app.post('/signin', validateLogin, login);
  app.post('/signup', validateUser, createUser);

  // Так как используется хранение токена в cookies
  // добавляем роут signout, который очищает бы куки
  app.get('/signout', (req, res) => {
    res.status(200).clearCookie('jwt').send({ message: 'Выход' });
  });

  app.use(auth); // защищаем все роуты ниже, нет доступа неавторизованным пользователям
  app.use('/', users);
  app.use('/', cards);

  // подключаем логгер ошибок
  // нужно подключить после обработчиков роутов и до обработчиков ошибок
  app.use(errorLogger);

  app.use(errors()); // обработчик ошибок celebrate

  app.use(() => {
    throw new NotFoundError('Ой! Такой страницы нет');
  });

  app.use(handleError); // централизованная обработка ошибок

  app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`);
  });
}

main();
