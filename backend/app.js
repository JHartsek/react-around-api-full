const helmet = require('helmet');
const express = require('express');
const mongoose = require('mongoose');
const { limiter } = require('./utils/limiter');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middleware/auth');

const app = express();
app.use(helmet());
app.use(limiter);
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/aroundb');

const { PORT = 3000 } = process.env;
const ERROR_CODE = 404;

app.use((req, res, next) => {
  req.user = {
    _id: '630d72f88e5be4e97c962ead',
  };
  next();
});

app.post('/signin', login)
app.post('/signup', createUser)


app.use(auth)
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use('/', (req, res) => {
  res.status(ERROR_CODE).send({ message: 'Requested resource not found' });
});

app.listen(PORT);
