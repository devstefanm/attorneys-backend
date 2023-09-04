import { Request, Response } from 'express';
import { getSSNNumbersServiceTemplate } from 'services/helpers/ssnNumbersHelpers';
import { ISSNNumber } from 'types/ssnNumbersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';

export const getSSNNumbersService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ISSNNumber[] | undefined>> => {
  try {
    return await getSSNNumbersServiceTemplate(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
