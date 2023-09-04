import { NextFunction, Request, Response } from 'express';
import { getExecutorsListService } from 'services/executorsServices/getExecutorsListService';
import { getExecutorsNamesService } from 'services/executorsServices/getExecutorsNamesService';

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
