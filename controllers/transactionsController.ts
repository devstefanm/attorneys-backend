import { NextFunction, Request, Response } from 'express';
import { getTransactionsListService } from 'services/transactionsServices/getTransactionsListService';
import { createTransactionService } from 'services/transactionsServices/createTransactionService';
import { editTransactionService } from 'services/transactionsServices/editTransactionService';
import { deleteTransactionService } from 'services/transactionsServices/deleteTransactionService';
import { getTransactionService } from 'services/transactionsServices/getTransactionService';
import { importTransactionsListService } from 'services/transactionsServices/importTransactionsListService';
import { exportTransactionsListService } from 'services/transactionsServices/exportTransactionsListService';

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
  getTransaction: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await getTransactionService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  postTransaction: async (req: Request, res: Response, _next: NextFunction) => {
    try {
      res.json(await createTransactionService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  patchTransaction: async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    try {
      res.json(await editTransactionService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  deleteTransaction: async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    try {
      res.json(await deleteTransactionService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  importTransactionsList: async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    try {
      res.json(await importTransactionsListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
  exportTransactionsList: async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    try {
      res.json(await exportTransactionsListService(req, res));
    } catch (error) {
      console.error({ error: error.message });
      res.json({ error: error.message });
    }
  },
};

export default transactions;
