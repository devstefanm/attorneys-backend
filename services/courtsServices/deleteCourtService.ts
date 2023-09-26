import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ICourt } from 'types/courtsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const deleteCourtService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<number | undefined>> => {
  try {
    const { courtId } = req.params;

    // Fetch the existing court details
    const existingCourt: ICourt = await db('courts')
      .select('id')
      .where('id', courtId)
      .first();

    if (!existingCourt) {
      res.status(404);
      return mapApiToResponse(404, 'errors.notFound', existingCourt);
    }

    // Delete the court with the specified courtId
    await db('courts').where('id', courtId).del();

    res.status(200); // 200 instead of 204 No Content status for successful deletion because message was not showing
    return mapApiToResponse(200, 'messages.courtsDeleted', existingCourt.id);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
