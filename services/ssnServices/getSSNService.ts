import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ISSNNumberApiResponseData } from 'types/ssnNumbersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const getSSNService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ISSNNumberApiResponseData | undefined>> => {
  try {
    const { ssnId } = req.params;

    const ssnNumber: ISSNNumberApiResponseData = await db('ssn_numbers')
      .select('id', 'ssn')
      .where('id', ssnId)
      .first();

    if (!ssnNumber) {
      res.status(404);
      return mapApiToResponse(404, `errors.notFound`);
    }

    res.status(200);
    return mapApiToResponse(
      200,
      `messages.retrieveSSNNumberSuccess`,
      ssnNumber,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
