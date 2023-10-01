import cities from 'controllers/citiesController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const {
  getCitiesList,
  getCitiesNames,
  postCity,
  patchCity,
  deleteCity,
  getCity,
} = cities;

router.get('/cities-list', authenticateToken, getCitiesList);
router.get('/cities-names', authenticateToken, getCitiesNames);
router.get('/city/:cityId', authenticateToken, getCity);

router.post('/cities', authenticateToken, postCity);

router.patch('/city/:cityId', authenticateToken, patchCity);

router.delete('/city/:cityId', authenticateToken, deleteCity);

export default router;
