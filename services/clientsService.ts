import { Request, Response } from 'express';
import { IClient } from 'types/clientsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';
import { getShortNamesServiceTemplate } from './helpers/universalHelpers';

export const getClientsNamesService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IClient[] | undefined>> => {
  try {
    return await getShortNamesServiceTemplate('clients')(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
