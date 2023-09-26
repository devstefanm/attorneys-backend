import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { IEmployer } from 'types/employersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const deleteEmployerService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<number | undefined>> => {
  try {
    const { employerId } = req.params;

    // Fetch the existing employer details
    const existingEmployer: IEmployer = await db('employers')
      .select('id')
      .where('id', employerId)
      .first();

    if (!existingEmployer) {
      res.status(404);
      return mapApiToResponse(404, 'errors.notFound', existingEmployer);
    }

    // Delete the employer with the specified employerId
    await db('employers').where('id', employerId).del();

    res.status(200); // 200 instead of 204 No Content status for successful deletion because message was not showing
    return mapApiToResponse(
      200,
      'messages.employersDeleted',
      existingEmployer.id,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
