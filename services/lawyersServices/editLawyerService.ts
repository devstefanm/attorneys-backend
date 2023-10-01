import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { mapPhoneNumberForDisplay } from 'services/helpers/phoneNumbersHelpers';
import { ILawyer } from 'types/lawyersTypes';
import { ICreateEntityApiResponseData } from 'types/universalTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const editLawyerService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    const { lawyerId } = req.params;
    const {
      first_name,
      last_name,
      email,
      address,
      city_id,
      office_name,
      phone_numbers,
    } = req.body;

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

    const existingLawyer: ILawyer = await db('lawyers')
      .select(
        'first_name',
        'last_name',
        'email',
        'address',
        'city_id',
        'office_name',
      )
      .where('id', lawyerId)
      .first();

    if (!existingLawyer) {
      res.status(404);
      return mapApiToResponse(404, `errors.notFound`);
    }

    const updateLawyerFields: ILawyer = {};

    if (first_name !== undefined && existingLawyer.first_name !== first_name) {
      updateLawyerFields.first_name = first_name;
    }

    if (last_name !== undefined && existingLawyer.last_name !== last_name) {
      updateLawyerFields.last_name = last_name;
    }

    if (
      office_name !== undefined &&
      existingLawyer.office_name !== office_name
    ) {
      updateLawyerFields.office_name = office_name;
    }

    if (email !== undefined && existingLawyer.email !== email) {
      updateLawyerFields.email = email;
    }

    if (address !== undefined && existingLawyer.address !== address) {
      updateLawyerFields.address = address;
    }

    if (city_id !== undefined && existingLawyer.city_id !== city_id) {
      updateLawyerFields.city_id = city_id;
    }

    if (phone_numbers !== undefined) {
      await db('phone_numbers').where('lawyer_id', lawyerId).del();
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
                lawyer_id: lawyerId,
              });
            }
          }),
        );
      }
    }

    let updatedLawyer: any[] = [];

    if (
      Object.keys(updateLawyerFields).length === 0 &&
      phone_numbers.length === 0
    ) {
      res.status(400);
      return mapApiToResponse(400, `errors.nothingChanged`);
    }

    if (Object.keys(updateLawyerFields).length > 0) {
      updatedLawyer = await db('lawyers')
        .where('id', lawyerId)
        .update(updateLawyerFields)
        .returning('id');
    }

    const apiResponse: ICreateEntityApiResponseData = updatedLawyer[0];

    res.status(200);
    return mapApiToResponse(200, `messages.editLawyerSuccess`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
