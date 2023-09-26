import { Request, Response } from 'express';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';
import { editShortNameServiceTemplate } from 'services/helpers/universalHelpers';
import { ICreateEntityApiResponseData } from 'types/universalTypes';

export const editClientService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    const { clientId } = req.params;
    return await editShortNameServiceTemplate('clients', Number(clientId))(
      req,
      res,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
