import ssnNumbers from 'controllers/ssnController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getSSNList, getSSNNumbers } = ssnNumbers;

router.get('/ssn-list', authenticateToken, getSSNList);
router.get('/ssn-numbers', authenticateToken, getSSNNumbers);

export default router;
