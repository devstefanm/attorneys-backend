import { Request, Response } from 'express';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { ICreateEntityApiResponseData } from 'types/universalTypes';
import { db } from 'attorneys-db';
import { mapPhoneNumberForDisplay } from 'services/helpers/phoneNumbersHelpers';

export const createLawyerService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    const {
      office_name,
      first_name,
      last_name,
      email,
      address,
      city_id,
      phone_numbers,
    } = req.body;

    let newLawyerId: number | null = null;

    if (first_name) {
      newLawyerId = (
        await db('lawyers')
          .insert({
            office_name,
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

    if (newLawyerId) {
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
                lawyer_id: newLawyerId,
              });
            }
          }),
        );
      }

      apiResponse = {
        id: newLawyerId,
      };

      res.status(200);
      return mapApiToResponse(200, `messages.createLawyerSuccess`, apiResponse);
    }

    res.status(404);
    return mapApiToResponse(404, `errors.notFound`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
