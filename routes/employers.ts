import employers from 'controllers/employersController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getEmployersNames } = employers;

router.get('/employers/names', authenticateToken, getEmployersNames);

export default router;
