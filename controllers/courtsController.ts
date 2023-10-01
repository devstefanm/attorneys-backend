import { NextFunction, Request, Response } from 'express';
import { createCourtService } from 'services/courtsServices/createCourtService';
import { deleteCourtService } from 'services/courtsServices/deleteCourtService';
import { editCourtService } from 'services/courtsServices/editCourtService';
import { getCourtService } from 'services/courtsServices/getCourtService';
import { getCourtsListService } from 'services/courtsServices/getCourtsListService';
import { getCourtsNamesService } from 'services/courtsServices/getCourtsNamesService';

const courts = {
  getCourtsNames: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getCourtsNamesService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getCourtsList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getCourtsListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getCourt: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getCourtService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  postCourt: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await createCourtService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  patchCourt: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await editCourtService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  deleteCourt: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await deleteCourtService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default courts;
