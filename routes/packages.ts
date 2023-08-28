import packages from 'controllers/packagesController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getPackagesList, getPackagesNames } = packages;

router.get('/packages-list', authenticateToken, getPackagesList);
router.get('/packages-names', authenticateToken, getPackagesNames);

export default router;
