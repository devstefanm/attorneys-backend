import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { ICreateTransactionApiResponseData } from 'types/transactionsTypes';

export const createTransactionService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateTransactionApiResponseData | undefined>> => {
  try {
    const { case_number, type, amount, posting_method, payment_date } =
      req.body;

    let caseId: number | undefined;

    if (case_number) {
      caseId = (
        await db('cases').select('id').where('case_number', case_number).first()
      ).id;
    } else {
      res.status(404);
      return mapApiToResponse(404, 'errors.notFound', {
        transaction_id: null,
      });
    }

    const newTransactionId = (
      await db('transactions')
        .insert({
          case_id: caseId,
          type,
          posting_method,
          payment_date,
          amount,
        })
        .returning('id')
    )[0].id;

    let apiResponse: ICreateTransactionApiResponseData | undefined = undefined;

    if (newTransactionId) {
      apiResponse = {
        transaction_id: newTransactionId,
      };

      res.status(200);
      return mapApiToResponse(
        200,
        `messages.createTransactionSuccess`,
        apiResponse,
      );
    }

    res.status(404);
    return mapApiToResponse(404, `errors.notFound`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
