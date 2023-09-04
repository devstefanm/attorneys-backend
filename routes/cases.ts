import cases from 'controllers/casesController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getCasesList, postCase, getfilteredCaseNumbers } = cases;

router.get('/cases-list', authenticateToken, getCasesList);
router.post('/cases', authenticateToken, postCase);
router.get('/filter-case-numbers', authenticateToken, getfilteredCaseNumbers);

export default router;
