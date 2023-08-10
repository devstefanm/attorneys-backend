import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

const { login, registration } = authController;

router.post('/login', login);
router.put('/registration/:id', registration);

export default router;
