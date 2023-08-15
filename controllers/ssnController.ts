import { NextFunction, Request, Response } from 'express';
import { getSSNListService } from 'services/ssnService';

const ssnNumbers = {
  getSSNList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getSSNListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default ssnNumbers;
