import { NextFunction, Request, Response } from 'express';
import {
  getEmployersListService,
  getEmployersNamesService,
} from 'services/employersService';

const employers = {
  getEmployersNames: async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    try {
      res.json(await getEmployersNamesService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getEmployersList: async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    try {
      res.json(await getEmployersListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default employers;
