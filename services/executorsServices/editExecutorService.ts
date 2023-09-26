import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { IExecutor } from 'types/executorsTypes';
import { ICreateEntityApiResponseData } from 'types/universalTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const editExecutorService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    const { executorId } = req.params;
    const { first_name, last_name, email, address, city_id } = req.body;

    if (
      first_name === null ||
      last_name === null ||
      first_name === '' ||
      last_name === ''
    ) {
      res.status(400);
      return mapApiToResponse(400, `errors.noName`);
    }

    const existingExecutor: IExecutor = await db('executors')
      .select('first_name', 'last_name', 'email', 'address', 'city_id')
      .where('id', executorId)
      .first();

    if (!existingExecutor) {
      res.status(404);
      return mapApiToResponse(404, `errors.notFound`);
    }

    const updateExecutorFields: IExecutor = {};

    if (
      first_name !== undefined &&
      existingExecutor.first_name !== first_name
    ) {
      updateExecutorFields.first_name = first_name;
    }

    if (last_name !== undefined && existingExecutor.last_name !== last_name) {
      updateExecutorFields.last_name = last_name;
    }

    if (email !== undefined && existingExecutor.email !== email) {
      updateExecutorFields.email = email;
    }

    if (address !== undefined && existingExecutor.address !== address) {
      updateExecutorFields.address = address;
    }

    if (city_id !== undefined && existingExecutor.city_id !== city_id) {
      updateExecutorFields.city_id = city_id;
    }

    if (Object.keys(updateExecutorFields).length === 0) {
      res.status(400);
      return mapApiToResponse(400, `errors.nothingChanged`);
    }

    const updatedExecutor = await db('executors')
      .where('id', executorId)
      .update(updateExecutorFields)
      .returning('id');

    const apiResponse: ICreateEntityApiResponseData = updatedExecutor[0];

    res.status(200);
    return mapApiToResponse(200, `messages.editExecutorSuccess`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
