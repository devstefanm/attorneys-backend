import { Request, Response } from 'express';
import { getShortNameServiceTemplate } from 'services/helpers/universalHelpers';
import { IClientApiResponseData } from 'types/clientsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';

export const getClientService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IClientApiResponseData | undefined>> => {
  try {
    const { clientId } = req.params;
    return getShortNameServiceTemplate('clients', Number(clientId))(res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
