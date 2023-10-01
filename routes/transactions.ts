import transactions from 'controllers/transactionsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const {
  getTransactionsList,
  postTransaction,
  patchTransaction,
  deleteTransaction,
  getTransaction,
} = transactions;

router.get('/transactions-list', authenticateToken, getTransactionsList);
router.get('/transaction/:transactionId', authenticateToken, getTransaction);

router.post('/transactions', authenticateToken, postTransaction);

router.patch(
  '/transaction/:transactionId',
  authenticateToken,
  patchTransaction,
);

router.delete(
  '/transaction/:transactionId',
  authenticateToken,
  deleteTransaction,
);

export default router;
