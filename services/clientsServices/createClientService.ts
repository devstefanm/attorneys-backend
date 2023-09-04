import { Request, Response } from 'express';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';
import { postShortNameServiceTemplate } from 'services/helpers/universalHelpers';
import { ICreateEntityApiResponseData } from 'types/universalTypes';

export const createClientService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    return await postShortNameServiceTemplate('clients')(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
