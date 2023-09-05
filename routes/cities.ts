import cities from 'controllers/citiesController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getCitiesList, getCitiesNames, postCity } = cities;

router.get('/cities-list', authenticateToken, getCitiesList);
router.get('/cities-names', authenticateToken, getCitiesNames);
router.post('/cities', authenticateToken, postCity);

export default router;
