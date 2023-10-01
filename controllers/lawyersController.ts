import { NextFunction, Request, Response } from 'express';
import { createLawyerService } from 'services/lawyersServices/createLawyerService';
import { deleteLawyerService } from 'services/lawyersServices/deleteLawyerService';
import { editLawyerService } from 'services/lawyersServices/editLawyerService';
import { getLawyerService } from 'services/lawyersServices/getLawyerService';
import { getLawyersListService } from 'services/lawyersServices/getLawyersListService';
import { getLawyersNamesService } from 'services/lawyersServices/getLawyersNamesService';

const lawyers = {
  getLawyersNames: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getLawyersNamesService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getLawyersList: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getLawyersListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  getLawyer: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getLawyerService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  postLawyer: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await createLawyerService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  patchLawyer: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await editLawyerService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  deleteLawyer: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await deleteLawyerService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default lawyers;
