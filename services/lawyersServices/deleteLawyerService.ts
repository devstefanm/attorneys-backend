import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ILawyer } from 'types/lawyersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const deleteLawyerService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<number | undefined>> => {
  try {
    const { lawyerId } = req.params;

    // Fetch the existing lawyer details
    const existingLawyer: ILawyer = await db('lawyers')
      .select('id')
      .where('id', lawyerId)
      .first();

    if (!existingLawyer) {
      res.status(404);
      return mapApiToResponse(404, 'errors.notFound', existingLawyer);
    }

    // Delete the lawyer with the specified lawyerId
    await db('lawyers').where('id', lawyerId).del();

    res.status(200); // 200 instead of 204 No Content status for successful deletion because message was not showing
    return mapApiToResponse(200, 'messages.lawyerDeleted', existingLawyer.id);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
