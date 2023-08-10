import courts from 'controllers/courtsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getCourtsNames } = courts;

router.get('/courts/names', authenticateToken, getCourtsNames);

export default router;
