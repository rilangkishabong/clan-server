import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import singinRrouter from './src/routes/signin';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/register', singinRrouter);

// const db = 'mongodb+srv://Heace:heace@cluster0.p0yf3.mongodb.net/test';
const db = require('./src/config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
});
