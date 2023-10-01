import { NextFunction, Request, Response } from 'express';
import { createExecutorService } from 'services/executorsServices/createExecutorService';
import { deleteExecutorService } from 'services/executorsServices/deleteExecutorService';
import { editExecutorService } from 'services/executorsServices/editExecutorService';
import { getExecutorService } from 'services/executorsServices/getExecutorService';
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
  getExecutor: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getExecutorService(req, res));
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
  patchExecutor: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await editExecutorService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  deleteExecutor: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await deleteExecutorService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default executors;
