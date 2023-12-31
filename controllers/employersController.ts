import { NextFunction, Request, Response } from 'express';
import { createEmployerService } from 'services/employersServices/createEmployerService';
import { deleteEmployerService } from 'services/employersServices/deleteEmployerService';
import { editEmployerService } from 'services/employersServices/editEmployerService';
import { getEmployerService } from 'services/employersServices/getEmployerService';
import { getEmployersListService } from 'services/employersServices/getEmployersListService';
import { getEmployersNamesService } from 'services/employersServices/getEmployersNamesService';

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
  getEmployer: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getEmployerService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  postEmployer: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await createEmployerService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  patchEmployer: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await editEmployerService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  deleteEmployer: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await deleteEmployerService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default employers;
