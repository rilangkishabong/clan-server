import { Router } from 'express';
import { User } from './model';
const router = Router();

const createOne = async (req, res) => {
  console.log(req.body);

  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

router.post('/', createOne);

export default router;
