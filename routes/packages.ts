import packages from 'controllers/packagesController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getPackagesList, getPackagesNames, postPackage } = packages;

router.get('/packages-list', authenticateToken, getPackagesList);
router.get('/packages-names', authenticateToken, getPackagesNames);
router.post('/packages', authenticateToken, postPackage);

export default router;
