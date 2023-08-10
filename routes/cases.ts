import cases from 'controllers/casesController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getCasesList } = cases;

router.get('/cases-list', authenticateToken, getCasesList);

export default router;
