import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import clanRouter from './resources/clan/router';
import userRouter from './resources/user/router';
import { signin, signup, protect } from './utils/auth';
import cors from 'cors';
import https from 'https';
import fs from 'fs';

const app = express();
const options = {
  key: fs.readFileSync(__dirname + '/cert/private.pem'),
  cert: fs.readFileSync(__dirname + '/cert/server.cert'),
};

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.body);
  next();
});
app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/clan', clanRouter);
app.post('/signin', signin);
app.post('/signup', signup);

// const db = 'mongodb+srv://Heace:heace@cluster0.p0yf3.mongodb.net/test';
const db = require('./config/keys').mongoURI;
const url = `mongodb+srv://${process.env.DB_HOSTNAME}/${process.env.DB_NAME}`;
const opts = {
  user: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
};
const httpsServer = https.createServer(options, app);

const start = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...opts,
    });

    httpsServer.listen(process.env.PORT, () => {
      console.log(`app is listening to port ${process.env.PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
