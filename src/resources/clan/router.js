import { Router } from 'express';
import { Clan } from './model';

export const router = Router();

function createOne{
    async (req, res) => {
        console.log(req.body);
        try {
          const clan = await Clan.create(req.body);
          res.status(200).json(clan);
        } catch (e) {
          console.error(e);
          res.status(400).end();
        }
      }
}

router.post('/', createOne);
