import packages from 'controllers/packagesController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const {
  getPackagesList,
  getPackagesNames,
  postPackage,
  patchPackage,
  deletePackage,
  getPackage,
} = packages;

router.get('/packages-list', authenticateToken, getPackagesList);
router.get('/packages-names', authenticateToken, getPackagesNames);
router.get('/package/:packageId', authenticateToken, getPackage);

router.post('/packages', authenticateToken, postPackage);

router.patch('/package/:packageId', authenticateToken, patchPackage);

router.delete('/package/:packageId', authenticateToken, deletePackage);

export default router;
