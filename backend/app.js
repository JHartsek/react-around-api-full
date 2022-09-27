const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { limiter } = require('./utils/limiter');
const { celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middleware/logger');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middleware/auth');

const app = express();
app.use(cors());
app.options('*',cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000 } = process.env;
const ERROR_CODE = 404;

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}), login)

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
}), createUser)

app.use(auth)
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('/', (req, res) => {
  res.status(ERROR_CODE).send({ message: 'Requested resource not found' });
});

app.use(errorLogger);
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  const { statusCode = 500 , message } = err; 
  res.status(statusCode).send({ message: statusCode === 500 ? 'An error has occured on the server' : message })
})

app.listen(PORT, () => {
  console.log(`I'm ready`)
});
