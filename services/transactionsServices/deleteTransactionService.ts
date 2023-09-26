import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ITransaction } from 'types/transactionsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const deleteTransactionService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<number | undefined>> => {
  try {
    const { transactionId } = req.params;

    // Fetch the existing transaction details
    const existingTransaction: ITransaction = await db('transactions')
      .select('id')
      .where('id', transactionId)
      .first();

    if (!existingTransaction) {
      res.status(404);
      return mapApiToResponse(404, 'errors.notFound', existingTransaction);
    }

    // Delete the transaction with the specified transactionId
    await db('transactions').where('id', transactionId).del();

    res.status(200); // 200 instead of 204 No Content status for successful deletion because message was not showing
    return mapApiToResponse(
      200,
      'messages.transactionDeleted',
      existingTransaction.id,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
