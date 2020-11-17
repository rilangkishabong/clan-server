import { Router } from 'express';
import { clanControllers } from './clan.controllers';

const router = Router();

router.route('/').get(clanControllers.getMany).post(clanControllers.createOne);

router
  .route('/:id')
  .get(clanControllers.getOne)
  .put(clanControllers.updateOne)
  .delete(clanControllers.removeOne);

export default router;
