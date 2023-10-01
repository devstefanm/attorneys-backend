import clients from 'controllers/clientsController';
import express from 'express';
import { authenticateToken } from 'middlewares/schemas/authenticateToken';

const router = express.Router();

const {
  getClientsNames,
  getClientsList,
  postClient,
  patchClient,
  deleteClient,
  getClient,
} = clients;

router.get('/clients-names', authenticateToken, getClientsNames);
router.get('/clients-list', authenticateToken, getClientsList);
router.get('/client/:clientId', authenticateToken, getClient);

router.post('/clients', authenticateToken, postClient);

router.patch('/client/:clientId', authenticateToken, patchClient);

router.delete('/client/:clientId', authenticateToken, deleteClient);

export default router;
