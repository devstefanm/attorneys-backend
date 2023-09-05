import clients from 'controllers/clientsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const { getClientsNames, getClientsList, postClient } = clients;

router.get('/clients-names', authenticateToken, getClientsNames);
router.get('/clients-list', authenticateToken, getClientsList);
router.post('/clients', authenticateToken, postClient);

export default router;
