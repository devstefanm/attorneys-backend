import { editCaseService } from './../services/casesServices/editCaseService';
import { NextFunction, Request, Response } from 'express';
import { createCaseService } from 'services/casesServices/createCaseService';
import { deleteCaseService } from 'services/casesServices/deleteCaseService';
import { exportCasesListService } from 'services/casesServices/exportCasesListService';
import { filterCaseNumbersService } from 'services/casesServices/filterCaseNumbersService';
import { getCaseService } from 'services/casesServices/getCaseService';
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
  getCase: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getCaseService(req, res));
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
  postCase: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await createCaseService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  patchCase: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await editCaseService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  deleteCase: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await deleteCaseService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  exportCasesList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await exportCasesListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default cases;
