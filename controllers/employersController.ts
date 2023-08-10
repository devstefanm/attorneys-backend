import { NextFunction, Request, Response } from 'express';
import { getEmployersNamesService } from 'services/employersService';

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
};

export default employers;
