import ssnNumbers from 'controllers/ssnController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getSSNList, getSSNNumbers, postSSNNumber } = ssnNumbers;

router.get('/ssn-list', authenticateToken, getSSNList);
router.get('/ssn-numbers', authenticateToken, getSSNNumbers);
router.post('/ssn', authenticateToken, postSSNNumber);

export default router;
