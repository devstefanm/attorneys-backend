import employers from 'controllers/employersController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const {
  getEmployersNames,
  getEmployersList,
  postEmployer,
  patchEmployer,
  deleteEmployer,
  getEmployer,
} = employers;

router.get('/employers-names', authenticateToken, getEmployersNames);
router.get('/employers-list', authenticateToken, getEmployersList);
router.get('/employer/:employerId', authenticateToken, getEmployer);

router.post('/employers', authenticateToken, postEmployer);

router.patch('/employer/:employerId', authenticateToken, patchEmployer);

router.delete('/employer/:employerId', authenticateToken, deleteEmployer);

export default router;
