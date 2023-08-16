import { NextFunction, Request, Response } from 'express';
import { getCitiesListService } from 'services/citiesService';

const cities = {
  getCitiesList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getCitiesListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default cities;
