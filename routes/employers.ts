import employers from 'controllers/employersController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getEmployersNames, getEmployersList, postEmployer } = employers;

router.get('/employers-names', authenticateToken, getEmployersNames);
router.get('/employers-list', authenticateToken, getEmployersList);
router.post('/employers', authenticateToken, postEmployer);

export default router;
