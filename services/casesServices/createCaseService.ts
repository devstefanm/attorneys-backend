import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ICreateCaseApiResponseData } from 'types/casesTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { IPeople } from 'types/peopleTypes';
import { IOrganization } from 'types/organizationsTypes';
import { mapPhoneNumberForDisplay } from '../helpers/phoneNumbersHelpers';
import { casesSchema } from 'middlewares/schemas/casesSchemas';

export const createCaseService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateCaseApiResponseData | undefined>> => {
  try {
    // const { error } = casesSchema.validate(req.body);

    // if (error) {
    //   res.status(400);
    //   return catchErrorStack(res, error.details[0].message);
    // }

    const {
      first_name,
      last_name,
      jmbg,
      employed,
      employer_id,
      executor_ids,
      name,
      pib,
      cession,
      address,
      email,
      zip_code,
      city_id,
      case_number,
      contract_number,
      closing_date,
      business_numbers,
      phone_numbers,
      lawyer_id,
      client_id,
      court_id,
      ssn_number_id,
      package_id,
      principal,
      interest,
    } = req.body;

    let debtorId: number | undefined;

    if (jmbg) {
      const jmbgNumber = jmbg as string;

      const existingPerson: IPeople = await db('people')
        .where('jmbg', jmbgNumber)
        .first();

      if (existingPerson) {
        await db('people').where('id', existingPerson.id).update({
          first_name,
          last_name,
          employed,
          employer_id,
        });

        debtorId = (
          await db('debtors')
            .select('id')
            .where('person_id', existingPerson.id)
            .first()
        ).id;
      } else {
        const newPersonId: number = (
          await db('people')
            .insert({
              jmbg,
              first_name,
              last_name,
              employed,
              employer_id,
            })
            .returning('id')
        )[0].id;

        debtorId = (
          await db('debtors')
            .insert({
              type: 'person',
              is_legal: false,
              person_id: Number(newPersonId),
              cession,
              address,
              email,
              zip_code,
              city_id,
              entity_id: 1,
            })
            .returning('id')
        )[0].id;
      }
    } else if (name || pib) {
      const organizationName = name as string;
      const organizationPib = pib as string;
      let existingOrganization: IOrganization | undefined;

      if (organizationPib) {
        existingOrganization = await db('organizations')
          .where('pib', organizationPib)
          .first();

        if (existingOrganization) {
          if (
            existingOrganization.name.toLowerCase() !==
            organizationName.toLowerCase()
          ) {
            await db('organizations')
              .where('id', existingOrganization.id)
              .update({ name: organizationName });
          }
          debtorId = (
            await db('debtors')
              .select('id')
              .where('organization_id', existingOrganization.id)
              .first()
          ).id;
        }
      }

      if (!existingOrganization) {
        const existingOrganizations: IOrganization[] = await db('organizations')
          .select('id', 'name', 'pib')
          .where('name', organizationName);

        if (existingOrganizations.length !== 0) {
          if (existingOrganizations.length === 1) {
            existingOrganization = existingOrganizations[0];

            if (!existingOrganization.pib) {
              if (organizationPib) {
                await db('organizations')
                  .where('id', existingOrganization.id)
                  .update({ pib: organizationPib });
              }
              debtorId = (
                await db('debtors')
                  .select('id')
                  .where('organization_id', existingOrganization.id)
                  .first()
              ).id;
            } else {
              const newOrganizationId = (
                await db('organizations')
                  .insert({
                    name: organizationName,
                    pib: organizationPib,
                  })
                  .returning('id')
              )[0].id;

              debtorId = (
                await db('debtors')
                  .insert({
                    type: 'organization',
                    is_legal: true,
                    organization_id: newOrganizationId,
                    cession,
                    address,
                    email,
                    zip_code,
                    city_id,
                    entity_id: 1,
                  })
                  .returning('id')
              )[0].id;
            }
          } else {
            const newOrganizationId = (
              await db('organizations')
                .insert({
                  name: organizationName,
                  pib: organizationPib,
                })
                .returning('id')
            )[0].id;

            debtorId = (
              await db('debtors')
                .insert({
                  type: 'organization',
                  is_legal: true,
                  organization_id: newOrganizationId,
                  cession,
                  address,
                  email,
                  zip_code,
                  city_id,
                  entity_id: 1,
                })
                .returning('id')
            )[0].id;
          }
        } else {
          const newOrganizationId = (
            await db('organizations')
              .insert({
                name: organizationName,
                pib: organizationPib,
              })
              .returning('id')
          )[0].id;

          debtorId = (
            await db('debtors')
              .insert({
                type: 'organization',
                is_legal: true,
                organization_id: newOrganizationId,
                cession,
                address,
                email,
                zip_code,
                city_id,
                entity_id: 1,
              })
              .returning('id')
          )[0].id;
        }
      }
    }

    const newCaseId = (
      await db('cases')
        .insert({
          debtor_id: debtorId,
          case_number,
          contract_number,
          closing_date,
          lawyer_id,
          client_id,
          court_id,
          ssn_number_id,
          package_id,
          principal,
          interest,
        })
        .returning('id')
    )[0].id;

    if (business_numbers.concat(phone_numbers, executor_ids).includes(null)) {
      res.status(500);
      catchErrorStack(
        res,
        'Phone numbers, beiliffs nor business numbers cannot include null',
      );
    }

    if (business_numbers && business_numbers.length > 0) {
      await Promise.all(
        business_numbers.map(async (businessNumber: string) => {
          // Check if the business number already exists
          const existingBusinessNumber = await db('business_numbers')
            .where({ number: businessNumber })
            .first();

          if (!existingBusinessNumber) {
            const businessNumberId = (
              await db('business_numbers')
                .insert({
                  number: businessNumber,
                })
                .returning('id')
            )[0].id;

            await db('case_business_numbers').insert({
              business_number_id: businessNumberId,
              case_id: newCaseId,
            });
          }
        }),
      );
    }

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
              debtor_id: debtorId,
            });
          }
        }),
      );
    }

    if (executor_ids && executor_ids.length > 0) {
      for (const executor_id of executor_ids) {
        await db('case_executors').insert({
          executor_id,
          case_id: newCaseId,
        });
      }
    }

    let apiResponse: ICreateCaseApiResponseData | undefined = undefined;

    if (newCaseId) {
      apiResponse = {
        case_id: newCaseId,
      };

      res.status(200);
      return mapApiToResponse(
        200,
        `message.case_successfully_created`,
        apiResponse,
      );
    }

    res.status(404);
    return mapApiToResponse(404, `message.case_not_found`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
