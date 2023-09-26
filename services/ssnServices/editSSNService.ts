import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ISSNNumber } from 'types/ssnNumbersTypes';
import { ICreateEntityApiResponseData } from 'types/universalTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const editSSNNumberService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    const { ssnId } = req.params;
    const { ssn } = req.body;

    if (ssn === null || ssn === '') {
      res.status(400);
      return mapApiToResponse(400, `errors.noName`);
    }

    const existingSSNNumber: ISSNNumber = await db('ssn_numbers')
      .select('ssn')
      .where('id', ssnId)
      .first();

    if (!existingSSNNumber) {
      res.status(404);
      return mapApiToResponse(404, `errors.notFound`);
    }

    const updatedSSNNumber = await db('ssn_numbers')
      .where('id', ssnId)
      .update({ ssn })
      .returning('id');

    const apiResponse: ICreateEntityApiResponseData = updatedSSNNumber[0];

    res.status(200);
    return mapApiToResponse(200, `messages.editSSNSuccess`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
