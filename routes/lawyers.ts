import lawyers from 'controllers/lawyersController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getLawyersNames, getLawyersList } = lawyers;

router.get('/lawyers-names', authenticateToken, getLawyersNames);
router.get('/lawyers-list', authenticateToken, getLawyersList);

export default router;
