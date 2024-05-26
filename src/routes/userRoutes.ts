import { Router } from 'express';
import { getUsers } from '../controllers/userController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/users', authenticate, authorize(['ADMIN',"SELLER"]), getUsers);

export default router;
