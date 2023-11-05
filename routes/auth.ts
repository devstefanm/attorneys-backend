import express from 'express';
import authController from '../controllers/authController';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { login, changePassword } = authController;

router.post('/login', login);
router.put('/change-password/:userId', authenticateToken, changePassword);

export default router;
