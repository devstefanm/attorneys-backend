import lawyers from 'controllers/lawyersController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const {
  getLawyersNames,
  getLawyersList,
  postLawyer,
  patchLawyer,
  deleteLawyer,
  getLawyer,
} = lawyers;

router.get('/lawyers-names', authenticateToken, getLawyersNames);
router.get('/lawyers-list', authenticateToken, getLawyersList);
router.get('/lawyer/:lawyerId', authenticateToken, getLawyer);

router.post('/lawyers', authenticateToken, postLawyer);

router.patch('/lawyer/:lawyerId', authenticateToken, patchLawyer);

router.delete('/lawyer/:lawyerId', authenticateToken, deleteLawyer);

export default router;
