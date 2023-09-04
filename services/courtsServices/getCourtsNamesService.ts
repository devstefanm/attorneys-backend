import { Request, Response } from 'express';
import { getShortNamesServiceTemplate } from 'services/helpers/universalHelpers';
import { ICourt } from 'types/courtsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';

export const getCourtsNamesService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICourt[] | undefined>> => {
  try {
    return await getShortNamesServiceTemplate('courts')(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
