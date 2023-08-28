import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { generateBigIntSearchQuery } from './helpers/universalHelpers';
import { ITransactionsListApiResponseData } from 'types/transactionsTypes';

export const getTransactionsListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ITransactionsListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'desc',
      sortBy = 't.created_at',
      size = 10,
      page = 1,
      amount,
      posting_method,
      case_number,
      excerpt_number,
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCaseTransactionsList = 'transactionsList'.toUpperCase();

    const totalCountQuery = db('transactions as t')
      .select(db.raw('COUNT(DISTINCT t.id) as total_transactions'))
      .leftJoin('cases as c', 't.case_id', 'c.id')
      .leftJoin('excerpts as e', 't.excerpt_id', 'e.id')
      .first();

    const transactionsQuery = db('transactions as t')
      .select(
        't.id',
        't.type',
        't.amount',
        't.posting_method',
        't.payment_date',
        'c.case_number',
        'e.excerpt_number',
      )
      .leftJoin('cases as c', 't.case_id', 'c.id')
      .leftJoin('excerpts as e', 't.excerpt_id', 'e.id')
      .offset(offset)
      .limit(Number(size));

    switch (sortBy) {
      case 'type':
        transactionsQuery.orderBy('t.type', sort as string);
        break;
      case 'amount':
        transactionsQuery.orderBy('t.amount', sort as string);
        break;
      case 'posting_method':
        transactionsQuery.orderBy('t.posting_method', sort as string);
        break;
      case 'payment_date':
        transactionsQuery.orderBy('t.payment_date', sort as string);
        break;
      case 'case_number':
        transactionsQuery.orderBy('c.case_number', sort as string);
        break;
      case 'excerpt_number':
        transactionsQuery.orderBy('e.excerpt_number', sort as string);
        break;
      default:
        transactionsQuery.orderBy('t.created_at', 'desc');
        break;
    }

    if (amount) {
      const amountValue = amount as string;
      generateBigIntSearchQuery(transactionsQuery, amountValue, 't.amount');
      generateBigIntSearchQuery(totalCountQuery, amountValue, 't.amount');
    }

    if (posting_method) {
      const postingMethod = posting_method as string;
      transactionsQuery.where(function () {
        this.whereRaw('LOWER(t.posting_method) LIKE ?', [
          `%${postingMethod.toLowerCase()}%`,
        ]);
      });
      totalCountQuery.where(function () {
        this.whereRaw('LOWER(t.posting_method) LIKE ?', [
          `%${postingMethod.toLowerCase()}%`,
        ]);
      });
    }

    if (case_number) {
      const caseNumber = case_number as string;
      generateBigIntSearchQuery(transactionsQuery, caseNumber, 'c.case_number');
      generateBigIntSearchQuery(totalCountQuery, caseNumber, 'c.case_number');
    }

    if (excerpt_number) {
      const excerptNumber = excerpt_number as string;
      generateBigIntSearchQuery(
        transactionsQuery,
        excerptNumber,
        'e.excerpt_number',
      );
      generateBigIntSearchQuery(
        totalCountQuery,
        excerptNumber,
        'e.excerpt_number',
      );
    }

    const [totalCountResult, transactions] = await Promise.all([
      totalCountQuery,
      transactionsQuery,
    ]);

    if (transactions.length === 0 || !totalCountResult) {
      res.status(404);
      return mapApiToResponse(404, `${upperCaseTransactionsList}.NOT_FOUND`);
    }

    const totalTransactions = Number(totalCountResult.total_transactions);
    const totalPages = Math.ceil(Number(totalTransactions) / Number(size));

    const apiResponse: ITransactionsListApiResponseData = {
      transactions,
      meta: {
        sort: (sort as string) ?? 'asc',
        sortBy: (sortBy as string) ?? 'created_at',
        total_number: totalTransactions,
        total_pages: totalPages,
        page: page as number,
      },
    };

    res.status(200);
    return mapApiToResponse(
      200,
      `${upperCaseTransactionsList}.SUCCESSFULY_RETRIEVED_NAMES`,
      apiResponse,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
