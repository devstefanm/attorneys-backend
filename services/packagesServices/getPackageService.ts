import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { IPackageApiResponseData } from 'types/packagesTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const getPackageService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IPackageApiResponseData | undefined>> => {
  try {
    const { packageId } = req.params;

    const chosenPackage: IPackageApiResponseData = await db('packages')
      .select('id', 'package_name')
      .where('id', packageId)
      .first();

    if (!chosenPackage) {
      res.status(404);
      return mapApiToResponse(404, `errors.notFound`);
    }

    res.status(200);
    return mapApiToResponse(
      200,
      `messages.retrievePackageSuccess`,
      chosenPackage,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
