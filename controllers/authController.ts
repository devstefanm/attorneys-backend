import { NextFunction, Request, Response } from 'express';
import { loginService, registrationService } from 'services/authService';

const auth = {
  login: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await loginService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  registration: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await registrationService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default auth;
