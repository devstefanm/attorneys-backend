import { Request, Response } from 'express';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { ICreateEntityApiResponseData } from 'types/universalTypes';
import { db } from 'attorneys-db';

export const createExecutorService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    const { first_name, last_name, email, address, city_id } = req.body;

    let newExecutorId = null,
      cityId: number | undefined;

    if (city_id) {
      cityId = (await db('cities').select('id').where('id', city_id).first())
        .id;
    } else {
      res.status(404);
      return mapApiToResponse(404, 'error.not_found.wrong_city_id', {
        id: null,
      });
    }

    if (first_name && last_name) {
      newExecutorId = (
        await db('executors')
          .insert({
            first_name,
            last_name,
            email,
            address,
            city_id,
          })
          .returning('id')
      )[0].id;
    } else {
      res.status(400);
      return mapApiToResponse(400, `message.executors_names`);
    }

    let apiResponse: ICreateEntityApiResponseData | undefined = undefined;

    if (newExecutorId) {
      apiResponse = {
        id: newExecutorId,
      };

      res.status(200);
      return mapApiToResponse(
        200,
        `message.executor_successfully_created`,
        apiResponse,
      );
    }

    res.status(404);
    return mapApiToResponse(404, `message.executor_not_found`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
