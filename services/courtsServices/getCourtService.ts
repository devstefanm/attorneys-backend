import { Request, Response } from 'express';
import { getShortNameServiceTemplate } from 'services/helpers/universalHelpers';
import { ICourtApiResponseData } from 'types/courtsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';

export const getCourtService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICourtApiResponseData | undefined>> => {
  try {
    const { courtId } = req.params;
    return getShortNameServiceTemplate('courts', Number(courtId))(res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
