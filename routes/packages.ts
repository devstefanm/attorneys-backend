import packages from 'controllers/packagesController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getPackagesList } = packages;

router.get('/packages-list', authenticateToken, getPackagesList);

export default router;
