import { Request, Response } from 'express';
import { getShortNameServiceTemplate } from 'services/helpers/universalHelpers';
import { IEmployerApiResponseData } from 'types/employersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';

export const getEmployerService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IEmployerApiResponseData | undefined>> => {
  try {
    const { employerId } = req.params;
    return getShortNameServiceTemplate('employers', Number(employerId))(res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
