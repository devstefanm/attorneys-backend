import transactions from 'controllers/transactionsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';
import upload from 'middlewares/uploadMiddleware';

const router = express.Router();

const {
  getTransactionsList,
  postTransaction,
  patchTransaction,
  deleteTransaction,
  getTransaction,
  importTransactionsList,
} = transactions;

router.get('/transactions-list', authenticateToken, getTransactionsList);
router.get('/transaction/:transactionId', authenticateToken, getTransaction);

router.post('/transactions', authenticateToken, postTransaction);
router.post(
  '/import-transactions-list',
  authenticateToken,
  upload.single('file'),
  importTransactionsList,
);

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
