import { Request, Response } from 'express';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { ICreateEntityApiResponseData } from 'types/universalTypes';
import { db } from 'attorneys-db';
import { mapPhoneNumberForDisplay } from 'services/helpers/phoneNumbersHelpers';

export const createExecutorService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    const { first_name, last_name, email, address, city_id, phone_numbers } =
      req.body;

    let newExecutorId: number | null = null,
      cityId: number | undefined;

    if (city_id) {
      cityId = (await db('cities').select('id').where('id', city_id).first())
        .id;
    } else {
      res.status(404);
      return mapApiToResponse(404, 'errors.notFound', {
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
      return mapApiToResponse(400, `errors.noName`);
    }

    let apiResponse: ICreateEntityApiResponseData | undefined = undefined;

    if (newExecutorId) {
      if (phone_numbers && phone_numbers.length > 0) {
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
                executor_id: newExecutorId,
              });
            }
          }),
        );
      }

      apiResponse = {
        id: newExecutorId,
      };

      res.status(200);
      return mapApiToResponse(
        200,
        `messages.createExecutorSuccess`,
        apiResponse,
      );
    }

    res.status(404);
    return mapApiToResponse(404, `errors.notFound`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
