import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { IExecutorApiResponseData } from 'types/executorsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const getExecutorService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IExecutorApiResponseData | undefined>> => {
  try {
    const { executorId } = req.params;

    const executor: IExecutorApiResponseData = await db('executors as e')
      .select(
        'e.id',
        'e.first_name',
        'e.last_name',
        'e.email',
        db.raw(
          "CASE WHEN COUNT(ci.id) = 0 THEN null ELSE json_build_object('id', ci.id, 'name', ci.name) END as city",
        ),
        db.raw(
          'CASE WHEN COUNT(pn.number) = 0 THEN null ELSE json_agg(distinct pn.number) END as phone_numbers',
        ),
      )
      .where('e.id', executorId)
      .leftJoin('cities as ci', 'e.city_id', 'ci.id')
      .leftJoin('phone_numbers as pn', 'e.id', 'pn.executor_id')
      .groupBy('e.id', 'e.first_name', 'e.last_name', 'e.email', 'ci.id')
      .first();

    if (!executor) {
      res.status(404);
      return mapApiToResponse(404, `errors.notFound`);
    }

    res.status(200);
    return mapApiToResponse(200, `messages.retrieveExecutorSuccess`, executor);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
