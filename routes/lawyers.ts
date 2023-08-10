import lawyers from 'controllers/lawyersController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getLawyersNames } = lawyers;

router.get('/lawyers/names', authenticateToken, getLawyersNames);

export default router;
