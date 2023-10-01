import { NextFunction, Request, Response } from 'express';
import { createCityService } from 'services/citiesServices/createCityService';
import { deleteCityService } from 'services/citiesServices/deleteCityService';
import { editCityService } from 'services/citiesServices/editCityService';
import { getCitiesListService } from 'services/citiesServices/getCitiesListService';
import { getCitiesNamesService } from 'services/citiesServices/getCitiesNamesService';
import { getCityService } from 'services/citiesServices/getCityService';

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
  getCity: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getCityService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  postCity: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await createCityService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  patchCity: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await editCityService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  deleteCity: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await deleteCityService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default cities;
