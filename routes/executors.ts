import executors from 'controllers/executorsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getExecutorsNames } = executors;

router.get('/executors/names', authenticateToken, getExecutorsNames);

export default router;
