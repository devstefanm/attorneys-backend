import clients from 'controllers/clientsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getClientsNames } = clients;

router.get('/clients/names', authenticateToken, getClientsNames);

export default router;
