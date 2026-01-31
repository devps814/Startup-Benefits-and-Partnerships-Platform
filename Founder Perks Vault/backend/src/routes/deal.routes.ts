import { Router } from 'express';
import { getDeals, getDealById } from '../controllers/deal.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getDeals);
router.get('/:id', getDealById);

export default router;
