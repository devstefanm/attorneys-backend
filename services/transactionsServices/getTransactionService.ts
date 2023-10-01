import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ITransactionApiResponseData } from 'types/transactionsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const getTransactionService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ITransactionApiResponseData | undefined>> => {
  try {
    const { transactionId } = req.params;

    const transaction: ITransactionApiResponseData = await db(
      'transactions as t',
    )
      .select(
        't.id',
        't.type',
        't.amount',
        't.posting_method',
        't.payment_date',
        db.raw(
          "json_build_object('id', c.id, 'case_number', c.case_number, 'first_name', p.first_name, 'last_name', p.last_name, 'name', o.name) as case",
        ),
      )
      .where('t.id', transactionId)
      .leftJoin('cases as c', 't.case_id', 'c.id')
      .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
      .leftJoin('people as p', 'd.person_id', 'p.id')
      .leftJoin('organizations as o', 'd.organization_id', 'o.id')
      .first();

    if (!transaction) {
      res.status(404);
      return mapApiToResponse(404, `errors.notFound`);
    }

    res.status(200);
    return mapApiToResponse(
      200,
      `messages.retrieveTransactionSuccess`,
      transaction,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
