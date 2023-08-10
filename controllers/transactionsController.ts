import { NextFunction, Request, Response } from 'express';
import { getTransactionsListService } from 'services/transactionsService';

const transactions = {
  getTransactionsList: async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    try {
      res.json(await getTransactionsListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default transactions;
