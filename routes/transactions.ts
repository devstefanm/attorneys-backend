import transactions from 'controllers/transactionsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getTransactionsList, createTransaction } = transactions;

router.get('/transactions-list', authenticateToken, getTransactionsList);
router.post('/transactions', authenticateToken, createTransaction);

export default router;
