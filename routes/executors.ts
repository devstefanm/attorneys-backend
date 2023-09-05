import executors from 'controllers/executorsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getExecutorsNames, getExecutorsList, postExecutor } = executors;

router.get('/executors-names', authenticateToken, getExecutorsNames);
router.get('/executors-list', authenticateToken, getExecutorsList);
router.post('/executors', authenticateToken, postExecutor);

export default router;
