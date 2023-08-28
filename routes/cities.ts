import cities from 'controllers/citiesController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getCitiesList, getCitiesNames } = cities;

router.get('/cities-list', authenticateToken, getCitiesList);
router.get('/cities-names', authenticateToken, getCitiesNames);

export default router;
