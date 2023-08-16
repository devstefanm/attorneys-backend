import cities from 'controllers/citiesController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getCitiesList } = cities;

router.get('/cities-list', authenticateToken, getCitiesList);

export default router;
