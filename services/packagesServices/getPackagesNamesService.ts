import { Request, Response } from 'express';
import { getPackagesNamesServiceTemplate } from 'services/helpers/packagesHelpers';
import { IPackage } from 'types/packagesTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';

export const getPackagesNamesService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IPackage[] | undefined>> => {
  try {
    return await getPackagesNamesServiceTemplate(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
