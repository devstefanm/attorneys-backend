import { NextFunction, Request, Response } from 'express';
import { getLawyersNamesService } from 'services/lawyersService';

const lawyers = {
  getLawyersNames: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getLawyersNamesService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default lawyers;
