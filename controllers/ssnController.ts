import { NextFunction, Request, Response } from 'express';
import { getSSNListService } from 'services/ssnServices/getSSNListService';
import { getSSNNumbersService } from 'services/ssnServices/getSSNNumbersService';

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
};

export default ssnNumbers;
