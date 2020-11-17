import 'dotenv/config';
import { User } from '../resources/user/model';
import jwt from 'jsonwebtoken';

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRETExp,
  });
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: 'Username and password required.' });
  }
  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const signin = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: 'Username and password required.' });
  }

  try {
    const user = await User.findOne({ username: req.body.username })
      .select('username password')
      .exec();

    if (!user) {
      return res.status(401).send({ message: 'Not auth' });
    }

    const match = await user.checkPassword(req.body.password);

    if (!match) {
      return res.status(401).send({ message: 'Not match' });
    }
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    console.error(e);
    return res.status(401).send({ message: 'Not auth' });
  }
};

export const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  let token = req.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return res.status(401).send({ message: 'not authh' });
  }

  try {
    const payload = await verifyToken(token);
    console.log(payload);
    const user = await User.findById(payload.id)
      .select('-password')
      .lean()
      .exec();

    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).end();
  }
};
