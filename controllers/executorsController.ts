import { NextFunction, Request, Response } from 'express';
import { createExecutorService } from 'services/executorsServices/createExecutorService';
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
  postExecutor: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await createExecutorService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default executors;
