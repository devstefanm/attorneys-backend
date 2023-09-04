import { NextFunction, Request, Response } from 'express';
import { getCitiesListService } from 'services/citiesServices/getCitiesListService';
import { getCitiesNamesService } from 'services/citiesServices/getCitiesNamesService';

const cities = {
  getCitiesList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getCitiesListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getCitiesNames: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getCitiesNamesService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default cities;
