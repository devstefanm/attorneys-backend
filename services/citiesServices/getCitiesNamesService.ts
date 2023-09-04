import { Request, Response } from 'express';
import { getShortNamesServiceTemplate } from 'services/helpers/universalHelpers';
import { ICity } from 'types/citiesTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';

export const getCitiesNamesService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICity[] | undefined>> => {
  try {
    return await getShortNamesServiceTemplate('cities')(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
