import executors from 'controllers/executorsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getExecutorsNames, getExecutorsList } = executors;

router.get('/executors-names', authenticateToken, getExecutorsNames);
router.get('/executors-list', authenticateToken, getExecutorsList);

export default router;
