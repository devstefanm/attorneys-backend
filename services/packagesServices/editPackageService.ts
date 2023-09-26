import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { IPackage } from 'types/packagesTypes';
import { ICreateEntityApiResponseData } from 'types/universalTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const editPackageService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    const { packageId } = req.params;
    const { package_name } = req.body;

    if (package_name === null || package_name === '') {
      res.status(400);
      return mapApiToResponse(400, `errors.noName`);
    }

    const existingPackage: IPackage = await db('packages')
      .select('package_name')
      .where('id', packageId)
      .first();

    if (!existingPackage) {
      res.status(404);
      return mapApiToResponse(404, `errors.notFound`);
    }

    const updatedPackage = await db('packages')
      .where('id', packageId)
      .update({ package_name })
      .returning('id');

    const apiResponse: ICreateEntityApiResponseData = updatedPackage[0];

    res.status(200);
    return mapApiToResponse(200, `messages.editPackageSuccess`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
