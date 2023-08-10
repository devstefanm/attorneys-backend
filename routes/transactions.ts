import transactions from 'controllers/transactionsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getTransactionsList } = transactions;

router.get('/transactions-list', authenticateToken, getTransactionsList);

export default router;
