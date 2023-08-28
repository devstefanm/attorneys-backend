import employers from 'controllers/employersController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getEmployersNames, getEmployersList } = employers;

router.get('/employers-names', authenticateToken, getEmployersNames);
router.get('/employers-list', authenticateToken, getEmployersList);

export default router;
