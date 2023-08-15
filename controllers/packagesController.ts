import { NextFunction, Request, Response } from 'express';
import { getPackagesListService } from 'services/packagesService';

const packages = {
  getPackagesList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getPackagesListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default packages;
