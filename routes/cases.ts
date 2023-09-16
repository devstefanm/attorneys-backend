import cases from 'controllers/casesController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const {
  getCasesList,
  postCase,
  getfilteredCaseNumbers,
  patchCase,
  deleteCase,
  getCase,
} = cases;

router.get('/cases-list', authenticateToken, getCasesList);
router.get('/case/:caseId', authenticateToken, getCase);
router.get('/filter-case-numbers', authenticateToken, getfilteredCaseNumbers);

router.post('/cases', authenticateToken, postCase);

router.patch('/case/:caseId', authenticateToken, patchCase);

router.delete('/case/:caseId', authenticateToken, deleteCase);

export default router;
