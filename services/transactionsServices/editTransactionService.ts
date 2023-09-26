import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ITransaction } from 'types/transactionsTypes';
import { ICreateEntityApiResponseData } from 'types/universalTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const editTransactionService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    const { transactionId } = req.params;
    const { type, amount, posting_method, payment_date, case_id } = req.body;

    if (type === null || type === '') {
      res.status(400);
      return mapApiToResponse(400, `errors.noType`);
    }

    if (amount === null || amount === '') {
      res.status(400);
      return mapApiToResponse(400, `errors.noAmount`);
    }

    if (case_id === null || case_id === '') {
      res.status(400);
      return mapApiToResponse(400, `errors.noCaseNumber`);
    }

    const existingTransaction: ITransaction = await db('transactions')
      .select('package_name')
      .where('id', transactionId)
      .first();

    if (!existingTransaction) {
      res.status(404);
      return mapApiToResponse(404, `errors.notFound`);
    }

    const updateTransactionFields: ITransaction = {};

    if (type !== undefined && existingTransaction.type !== type) {
      updateTransactionFields.type = type;
    }

    if (
      amount !== undefined &&
      Number(existingTransaction.amount) !== Number(amount)
    ) {
      updateTransactionFields.amount = amount;
    }

    if (
      posting_method !== undefined &&
      existingTransaction.posting_method !== posting_method
    ) {
      updateTransactionFields.posting_method = posting_method;
    }

    if (
      payment_date !== undefined &&
      existingTransaction.payment_date !== payment_date
    ) {
      updateTransactionFields.payment_date = payment_date;
    }

    if (case_id !== undefined && existingTransaction.case_id !== case_id) {
      updateTransactionFields.case_id = case_id;
    }

    if (Object.keys(updateTransactionFields).length === 0) {
      res.status(400);
      return mapApiToResponse(400, `errors.nothingChanged`);
    }

    const updatedTransaction = await db('transactions')
      .where('id', transactionId)
      .update(updateTransactionFields)
      .returning('id');

    const apiResponse: ICreateEntityApiResponseData = updatedTransaction[0];

    res.status(200);
    return mapApiToResponse(
      200,
      `messages.editTransactionSuccess`,
      apiResponse,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
