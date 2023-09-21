import { Router } from 'express';

import WalletController from '../api/controllers/WalletController';
import AuthMiddleware from '../api/middlewares/AuthMiddleware';
const router = Router();

router.use(AuthMiddleware.verifyToken);

router.post('/transfer', WalletController.transfer);
router.post('/withdraw', WalletController.withdraw);
router.post('/top-up', WalletController.topUp);

export default router;
