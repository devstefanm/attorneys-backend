import { Request, Response } from 'express';
import { ILawyer } from 'types/lawyersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { getFullNamesServiceTemplate } from './helpers/universalHelpers';
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
