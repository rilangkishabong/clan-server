import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { router as clanRouter } from './resources/clan/router';
import userRouter from './resources/user/router';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/clan', clanRouter);

// const db = 'mongodb+srv://Heace:heace@cluster0.p0yf3.mongodb.net/test';
const db = require('./config/keys').mongoURI;
const url = `mongodb+srv://${process.env.DB_HOSTNAME}/${process.env.DB_NAME}`;
const opts = {
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
};
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, ...opts })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
});
