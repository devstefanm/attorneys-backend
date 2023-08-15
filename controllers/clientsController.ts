import { NextFunction, Request, Response } from 'express';
import {
  getClientsListService,
  getClientsNamesService,
} from 'services/clientsService';

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
};

export default clients;
