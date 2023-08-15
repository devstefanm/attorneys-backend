import { NextFunction, Request, Response } from 'express';
import {
  getExecutorsListService,
  getExecutorsNamesService,
} from 'services/executorsService';

const executors = {
  getExecutorsNames: async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    try {
      res.json(await getExecutorsNamesService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getExecutorsList: async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    try {
      res.json(await getExecutorsListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default executors;
