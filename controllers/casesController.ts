import { NextFunction, Request, Response } from 'express';
import { createCaseService, getCasesListService } from 'services/casesService';

const cases = {
  getCasesList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getCasesListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  postCase: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await createCaseService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default cases;
