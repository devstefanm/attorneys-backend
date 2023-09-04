import { NextFunction, Request, Response } from 'express';
import { createCaseService } from 'services/casesServices/createCaseService';
import { filterCaseNumbersService } from 'services/casesServices/filterCaseNumbersService';
import { getCasesListService } from 'services/casesServices/getCasesListService';

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
  getfilteredCaseNumbers: async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    try {
      res.json(await filterCaseNumbersService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default cases;
