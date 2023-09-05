import courts from 'controllers/courtsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getCourtsNames, getCourtsList, postCourt } = courts;

router.get('/courts-names', authenticateToken, getCourtsNames);
router.get('/courts-list', authenticateToken, getCourtsList);
router.post('/courts', authenticateToken, postCourt);

export default router;
