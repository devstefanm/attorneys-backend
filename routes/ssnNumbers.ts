import ssnNumbers from 'controllers/ssnController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const {
  getSSNList,
  getSSNNumbers,
  postSSNNumber,
  patchSSNNumber,
  deleteSSNNumber,
  getSSNNumber,
} = ssnNumbers;

router.get('/ssn-list', authenticateToken, getSSNList);
router.get('/ssn-numbers', authenticateToken, getSSNNumbers);
router.get('/ssn/:ssnId', authenticateToken, getSSNNumber);

router.post('/ssn', authenticateToken, postSSNNumber);

router.patch('/ssn/:ssnId', authenticateToken, patchSSNNumber);

router.delete('/ssn/:ssnId', authenticateToken, deleteSSNNumber);

export default router;
