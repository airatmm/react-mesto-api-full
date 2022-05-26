const jwt = require('jsonwebtoken');

const JWT_SECRET = 'some-secret-key';

// JSON Web Token
// JSON объект закодированный с помощью секрета JWT_SECRET (пока простой как в тренажере)

const getToken = async (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });

module.exports = { getToken };
