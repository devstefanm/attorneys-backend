import ssnNumbers from 'controllers/ssnController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getSSNList } = ssnNumbers;

router.get('/ssn-list', authenticateToken, getSSNList);

export default router;
