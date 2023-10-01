import executors from 'controllers/executorsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const {
  getExecutorsNames,
  getExecutorsList,
  postExecutor,
  patchExecutor,
  deleteExecutor,
  getExecutor,
} = executors;

router.get('/executors-names', authenticateToken, getExecutorsNames);
router.get('/executors-list', authenticateToken, getExecutorsList);
router.get('/executor/:executorId', authenticateToken, getExecutor);

router.post('/executors', authenticateToken, postExecutor);

router.patch('/executor/:executorId', authenticateToken, patchExecutor);

router.delete('/executor/:executorId', authenticateToken, deleteExecutor);

export default router;
