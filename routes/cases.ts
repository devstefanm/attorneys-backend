import cases from 'controllers/casesController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';
import upload from 'middlewares/uploadMiddleware';

const router = express.Router();

const {
  getCasesList,
  postCase,
  getfilteredCaseNumbers,
  patchCase,
  deleteCase,
  getCase,
  exportCasesList,
  importCasesList,
} = cases;

router.get('/cases-list', authenticateToken, getCasesList);
router.get('/case/:caseId', authenticateToken, getCase);
router.get('/filter-case-numbers', authenticateToken, getfilteredCaseNumbers);

router.post('/cases', authenticateToken, postCase);
router.post('/export-cases-list', authenticateToken, exportCasesList);
router.post(
  '/import-cases-list',
  authenticateToken,
  upload.single('file'),
  importCasesList,
);

router.patch('/case/:caseId', authenticateToken, patchCase);

router.delete('/case/:caseId', authenticateToken, deleteCase);

export default router;
