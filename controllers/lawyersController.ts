import { NextFunction, Request, Response } from 'express';
import { getLawyersListService } from 'services/lawyersServices/getLawyersListService';
import { getLawyersNamesService } from 'services/lawyersServices/getLawyersNamesService';

const lawyers = {
  getLawyersNames: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getLawyersNamesService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getLawyersList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getLawyersListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default lawyers;
