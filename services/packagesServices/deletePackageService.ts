import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { IPackage } from 'types/packagesTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const deletePackageService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<number | undefined>> => {
  try {
    const { packageId } = req.params;

    // Fetch the existing package details
    const existingPackage: IPackage = await db('packages')
      .select('id')
      .where('id', packageId)
      .first();

    if (!existingPackage) {
      res.status(404);
      return mapApiToResponse(404, 'errors.notFound', existingPackage);
    }

    // Delete the package with the specified packageId
    await db('packages').where('id', packageId).del();

    res.status(200); // 200 instead of 204 No Content status for successful deletion because message was not showing
    return mapApiToResponse(200, 'messages.packageDeleted', existingPackage.id);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
