import { NextFunction, Request, Response } from 'express';
import { createSSNService } from 'services/ssnServices/createSSNService';
import { deleteSSNService } from 'services/ssnServices/deleteSSNService';
import { editSSNNumberService } from 'services/ssnServices/editSSNService';
import { getSSNListService } from 'services/ssnServices/getSSNListService';
import { getSSNNumbersService } from 'services/ssnServices/getSSNNumbersService';
import { getSSNService } from 'services/ssnServices/getSSNService';

const ssnNumbers = {
  getSSNList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getSSNListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getSSNNumbers: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getSSNNumbersService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getSSNNumber: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getSSNService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  postSSNNumber: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await createSSNService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  patchSSNNumber: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await editSSNNumberService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  deleteSSNNumber: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await deleteSSNService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default ssnNumbers;
