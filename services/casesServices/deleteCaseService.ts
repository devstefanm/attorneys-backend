import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ICase } from 'types/casesTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const deleteCaseService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<number | undefined>> => {
  try {
    const { caseId } = req.params;

    // Fetch the existing case details
    const existingCase: ICase = await db('cases')
      .select('id')
      .where('id', caseId)
      .first();

    if (!existingCase) {
      res.status(404);
      return mapApiToResponse(404, 'errors.caseNotFound', existingCase);
    }

    await db('case_executors').where('case_id', caseId).del();
    await db('case_business_numbers').where('case_id', caseId).del();

    // Delete the case with the specified caseId
    await db('cases').where('id', caseId).del();

    res.status(200); // 200 instead of 204 No Content status for successful deletion because message was not showing
    return mapApiToResponse(200, 'messages.caseDeleted', existingCase.id);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
