import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ICreateCaseApiResponseData } from 'types/casesTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { IPeople } from 'types/peopleTypes';
import { IOrganization } from 'types/organizationsTypes';
import { mapPhoneNumberForDisplay } from '../helpers/phoneNumbersHelpers';

export const createCaseService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateCaseApiResponseData | undefined>> => {
  try {
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
      status,
      old_payment,
      our_taxes,
      warning_price,
      entering_date,
      lawyer_hand_over_date,
      comment,
      limitation_objection,
    } = req.body;

    if (business_numbers?.concat(phone_numbers, executor_ids).includes(null)) {
      res.status(500);
      catchErrorStack(res, 'errors.phoneNumberNull');
    }

    if ((!first_name || !last_name) && !name) {
      res.status(400);
      return mapApiToResponse(400, `errors.noName`);
    }

    if (first_name && last_name && !jmbg) {
      res.status(400);
      return mapApiToResponse(400, `errors.noJMBG`);
    }

    if (!case_number) {
      res.status(400);
      return mapApiToResponse(400, `errors.noCaseNumber`);
    }

    if (!contract_number) {
      res.status(400);
      return mapApiToResponse(400, `errors.noContractNumber`);
    }

    if (!client_id) {
      res.status(400);
      return mapApiToResponse(400, `errors.noClient`);
    }

    let debtorId: number | undefined;

    let statusId: number | undefined;

    if (status) {
      statusId = (
        await db('statuses').select('id').where('name', status).first()
      )?.id;

      if (!statusId) {
        statusId = (
          await db('statuses').insert({ name: status }).returning('id')
        )[0].id;
      }
    }

    if (jmbg) {
      const jmbgNumber = jmbg as string;

      const existingPerson: IPeople = await db('people')
        .where('jmbg', jmbgNumber)
        .first();

      if (existingPerson?.id) {
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
        )?.id;
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

        if (existingOrganization?.id) {
          if (
            existingOrganization.name?.toLowerCase() !==
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
          )?.id;
        }
      }

      if (!existingOrganization?.id) {
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
              )?.id;
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
          lawyer_id,
          client_id,
          court_id,
          ssn_number_id,
          package_id,
          principal,
          interest,
          status_id: statusId,
          old_payment,
          our_taxes,
          warning_price,
          entering_date,
          lawyer_hand_over_date,
          comment,
          limitation_objection,
          closing_date,
          ...(closing_date ? { state: 'closed' } : { state: 'active' }),
        })
        .returning('id')
    )[0].id;

    if (business_numbers && business_numbers.length > 0) {
      await Promise.all(
        business_numbers.map(async (businessNumber: string) => {
          // Check if the business number already exists
          const existingBusinessNumber = (
            await db('business_numbers')
              .select('id')
              .where({ number: businessNumber })
              .first()
          )?.id;

          let businessNumberId: number = existingBusinessNumber;

          if (!existingBusinessNumber) {
            businessNumberId = (
              await db('business_numbers')
                .insert({
                  number: businessNumber,
                })
                .returning('id')
            )[0].id;
          }

          await db('case_business_numbers').insert({
            business_number_id: businessNumberId,
            case_id: newCaseId,
          });
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
      return mapApiToResponse(200, `messages.createCaseSuccess`, apiResponse);
    }

    res.status(404);
    return mapApiToResponse(404, `errors.caseNotFound`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
