import { NextFunction, Request, Response } from 'express';
import { createPackageService } from 'services/packagesServices/createPackageService';
import { getPackagesListService } from 'services/packagesServices/getPackagesListService';
import { getPackagesNamesService } from 'services/packagesServices/getPackagesNamesService';

const packages = {
  getPackagesList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getPackagesListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getPackagesNames: async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    try {
      res.json(await getPackagesNamesService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  postPackage: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await createPackageService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default packages;
