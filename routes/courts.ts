import courts from 'controllers/courtsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const {
  getCourtsNames,
  getCourtsList,
  postCourt,
  patchCourt,
  deleteCourt,
  getCourt,
} = courts;

router.get('/courts-names', authenticateToken, getCourtsNames);
router.get('/courts-list', authenticateToken, getCourtsList);
router.get('/court/:courtId', authenticateToken, getCourt);

router.post('/courts', authenticateToken, postCourt);

router.patch('/court/:courtId', authenticateToken, patchCourt);

router.delete('/court/:courtId', authenticateToken, deleteCourt);

export default router;
