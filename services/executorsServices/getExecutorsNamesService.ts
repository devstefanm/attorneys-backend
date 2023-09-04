import { Request, Response } from 'express';
import { getFullNamesServiceTemplate } from 'services/helpers/universalHelpers';
import { IExecutor } from 'types/executorsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';

export const getExecutorsNamesService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IExecutor[] | undefined>> => {
  try {
    return await getFullNamesServiceTemplate('executors')(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
