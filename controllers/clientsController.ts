import { NextFunction, Request, Response } from 'express';
import { createClientService } from 'services/clientsServices/createClientService';
import { deleteClientService } from 'services/clientsServices/deleteClientService';
import { editClientService } from 'services/clientsServices/editClientService';
import { getClientService } from 'services/clientsServices/getClientService';
import { getClientsListService } from 'services/clientsServices/getClientsListService';
import { getClientsNamesService } from 'services/clientsServices/getClientsNamesService';

const clients = {
  getClientsNames: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getClientsNamesService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getClientsList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getClientsListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getClient: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getClientService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  postClient: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await createClientService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  patchClient: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await editClientService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  deleteClient: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await deleteClientService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default clients;
