import { Request, Response } from 'express';
import { IEmployer } from 'types/employersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { getShortNamesServiceTemplate } from './helpers/universalHelpers';
import { IApiResponse } from 'utils/mapApiToResponse';

export const getEmployersNamesService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IEmployer[] | undefined>> => {
  try {
    return await getShortNamesServiceTemplate('employers')(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
