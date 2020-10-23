import { Router } from 'express';

import User from './../models/user';
const router = Router();

router.post('/', (req, res) => {
  console.log(req.body);

  let user = new User(req.body);

  user
    .save()
    .then((registeredUser) => res.status(200).send(registeredUser))
    .catch((err) => {
      console.error(err);
      res.status(401).end();
    });
});

export default router;
