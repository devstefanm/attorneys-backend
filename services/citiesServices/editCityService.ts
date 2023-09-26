import { ICreateEntityApiResponseData } from './../../types/universalTypes';
import { Request, Response } from 'express';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';
import { editShortNameServiceTemplate } from 'services/helpers/universalHelpers';

export const editCityService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    const { cityId } = req.params;
    return await editShortNameServiceTemplate('cities', Number(cityId))(
      req,
      res,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
