import { Request, Response } from 'express';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { ICreateEntityApiResponseData } from 'types/universalTypes';
import { db } from 'attorneys-db';

export const createSSNService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    const { ssn } = req.body;

    let newSSNId = null;

    if (ssn) {
      newSSNId = (
        await db('ssn_numbers')
          .insert({
            ssn,
          })
          .returning('id')
      )[0].id;
    } else {
      res.status(400);
      return mapApiToResponse(400, `errors.noSSN`);
    }

    let apiResponse: ICreateEntityApiResponseData | undefined = undefined;

    if (newSSNId) {
      apiResponse = {
        id: newSSNId,
      };

      res.status(200);
      return mapApiToResponse(200, `messages.createSSNSuccess`, apiResponse);
    }

    res.status(404);
    return mapApiToResponse(404, `errors.notFound`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
