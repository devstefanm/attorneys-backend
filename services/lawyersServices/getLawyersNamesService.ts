import { Request, Response } from 'express';
import { getFullNamesServiceTemplate } from 'services/helpers/universalHelpers';
import { ILawyer } from 'types/lawyersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { IApiResponse } from 'utils/mapApiToResponse';

export const getLawyersNamesService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ILawyer[] | undefined>> => {
  try {
    return await getFullNamesServiceTemplate('lawyers')(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
