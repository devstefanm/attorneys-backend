import { Request, Response } from 'express';
import { getShortNameServiceTemplate } from 'services/helpers/universalHelpers';
import { ICityApiResponseData } from 'types/citiesTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';

export const getCityService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICityApiResponseData | undefined>> => {
  try {
    const { cityId } = req.params;
    return getShortNameServiceTemplate('cities', Number(cityId))(res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
