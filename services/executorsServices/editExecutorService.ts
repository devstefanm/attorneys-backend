import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { mapPhoneNumberForDisplay } from 'services/helpers/phoneNumbersHelpers';
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
    const { first_name, last_name, email, address, city_id, phone_numbers } =
      req.body;

    if (
      first_name === null ||
      last_name === null ||
      first_name === '' ||
      last_name === ''
    ) {
      res.status(400);
      return mapApiToResponse(400, `errors.noName`);
    }

    if (phone_numbers?.includes(null)) {
      res.status(500);
      return catchErrorStack(res, 'errors.phoneNumberNull');
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

    if (phone_numbers !== undefined) {
      await db('phone_numbers').where('executor_id', executorId).del();
      if (phone_numbers.length > 0) {
        await Promise.all(
          phone_numbers.map(async (phoneNumber: string) => {
            const displayNumber = mapPhoneNumberForDisplay(phoneNumber);
            const existingPhoneNumber = await db('phone_numbers')
              .where({ display_number: displayNumber })
              .first();

            if (!existingPhoneNumber) {
              await db('phone_numbers').insert({
                number: phoneNumber,
                display_number: displayNumber,
                executor_id: executorId,
              });
            }
          }),
        );
      }
    }

    let updatedExecutor: any[] = [];

    if (
      Object.keys(updateExecutorFields).length === 0 &&
      phone_numbers?.length === 0
    ) {
      res.status(400);
      return mapApiToResponse(400, `errors.nothingChanged`);
    }

    if (Object.keys(updateExecutorFields).length > 0) {
      updatedExecutor = await db('executors')
        .where('id', executorId)
        .update(updateExecutorFields)
        .returning('id');
    }

    const apiResponse: ICreateEntityApiResponseData = updatedExecutor[0];

    res.status(200);
    return mapApiToResponse(200, `messages.editExecutorSuccess`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
