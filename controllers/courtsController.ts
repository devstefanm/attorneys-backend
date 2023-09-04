import { NextFunction, Request, Response } from 'express';
import { getCourtsListService } from 'services/courtsServices/getCourtsListService';
import { getCourtsNamesService } from 'services/courtsServices/getCourtsNamesService';

const courts = {
  getCourtsNames: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getCourtsNamesService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getCourtsList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getCourtsListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default courts;
