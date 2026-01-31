import { Router } from 'express';
import { createClaim, getMyClaims } from '../controllers/claim.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, createClaim);
router.get('/me', authenticate, getMyClaims);

export default router;
