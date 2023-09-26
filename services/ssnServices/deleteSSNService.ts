import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ISSNNumber } from 'types/ssnNumbersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const deleteSSNService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<number | undefined>> => {
  try {
    const { ssnId } = req.params;

    // Fetch the existing ssn details
    const existingSSN: ISSNNumber = await db('ssn_numbers')
      .select('id')
      .where('id', ssnId)
      .first();

    if (!existingSSN) {
      res.status(404);
      return mapApiToResponse(404, 'errors.notFound', existingSSN);
    }

    // Delete the ssn with the specified ssnId
    await db('ssn_numbers').where('id', ssnId).del();

    res.status(200); // 200 instead of 204 No Content status for successful deletion because message was not showing
    return mapApiToResponse(200, 'messages.ssnDeleted', existingSSN.id);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
