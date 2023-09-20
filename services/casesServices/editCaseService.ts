import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { mapPhoneNumberForDisplay } from 'services/helpers/phoneNumbersHelpers';
import { ICase, ICreateCaseApiResponseData } from 'types/casesTypes';
import { IDebtor } from 'types/debtorsTypes';
import { IOrganization } from 'types/organizationsTypes';
import { IPeople } from 'types/peopleTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const editCaseService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateCaseApiResponseData | undefined>> => {
  try {
    const { caseId } = req.params;
    const {
      first_name,
      last_name,
      jmbg,
      employed,
      employer_id,
      name,
      pib,
      executor_ids,
      business_numbers,
      phone_numbers,
      cession,
      address,
      email,
      zip_code,
      city_id,
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
    } = req.body;

    const updatedCaseFields: ICase = {};

    // Fetch the existing case details
    const existingCase: ICase = await db('cases as c')
      .select(
        'c.case_number',
        'c.contract_number',
        'c.closing_date',
        'c.lawyer_id',
        'c.client_id',
        'c.court_id',
        'c.ssn_number_id',
        'c.package_id',
        'c.principal',
        'c.interest',
        'c.debtor_id',
        'd.person_id',
        'd.organization_id',
      )
      .where('c.id', caseId)
      .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
      .first();

    if (!existingCase) {
      res.status(404);
      return mapApiToResponse(404, `message.case_not_found`, existingCase);
    }

    if (business_numbers?.concat(phone_numbers, executor_ids).includes(null)) {
      res.status(500);
      catchErrorStack(
        res,
        'Phone numbers, beiliffs nor business numbers cannot include null',
      );
    }

    let debtorId = existingCase.debtor_id as number;

    if (existingCase.person_id) {
      const existingPerson: IPeople = await db('people')
        .select(
          'id',
          'first_name',
          'last_name',
          'jmbg',
          'employed',
          'employer_id',
        )
        .where('id', existingCase.person_id)
        .first();

      if (!existingPerson) {
        res.status(404);
        return mapApiToResponse(
          404,
          `message.person_not_found`,
          existingPerson,
        );
      }

      const updatePersonFields: IPeople = {};

      if (
        first_name !== undefined &&
        existingPerson.first_name !== first_name
      ) {
        updatePersonFields.first_name = first_name;
      }

      if (last_name !== undefined && existingPerson.last_name !== last_name) {
        updatePersonFields.last_name = last_name;
      }

      if (jmbg !== undefined && existingPerson.jmbg !== jmbg) {
        const otherPersonId = (
          await db('people')
            .select('id')
            .where('id', '<>', existingCase.person_id)
            .andWhere(function () {
              this.where('jmbg', jmbg);
            })
            .first()
        )?.id;

        if (otherPersonId) {
          existingPerson.id = otherPersonId;
          const otherDebtorId = (
            await db('debtors')
              .select('id')
              .where('person_id', existingPerson.id)
              .first()
          )?.id;
          if (otherDebtorId) {
            debtorId = otherDebtorId;
          } else {
            await db('debtors').update({ person_id: existingPerson.id });
          }
        } else {
          updatePersonFields.jmbg = jmbg;
        }
      }

      if (
        employer_id !== undefined &&
        existingPerson.employer_id !== employer_id
      ) {
        updatePersonFields.employer_id = employer_id;
      }

      if (
        employed !== null &&
        employed !== undefined &&
        existingPerson.employed !== employed
      ) {
        updatePersonFields.employed = employed;
        updatePersonFields.employer_id = null;
      }

      if (Object.keys(updatePersonFields).length > 0) {
        await db('people')
          .where('id', existingPerson.id)
          .update(updatePersonFields);
      }
    }

    if (existingCase.organization_id) {
      const existingOrganization: IOrganization = await db('organizations')
        .select('id', 'name', 'pib')
        .where('id', existingCase.organization_id)
        .first();

      if (!existingOrganization) {
        res.status(404);
        return mapApiToResponse(
          404,
          `message.organization_not_found`,
          existingOrganization,
        );
      }

      const updateOrganizationFields: IOrganization = {};

      if (name !== undefined && existingOrganization.name != name) {
        updateOrganizationFields.name = name;
      }

      if (pib !== undefined && existingOrganization.pib != pib) {
        const otherOrganizationId = (
          await db('organizations')
            .select('id')
            .where('id', '<>', existingCase.organization_id)
            .andWhere(function () {
              this.where('pib', pib);
            })
            .first()
        )?.id;

        if (otherOrganizationId) {
          existingOrganization.id = otherOrganizationId;
          const otherDebtorId = (
            await db('debtors')
              .select('id')
              .where('organization_id', existingOrganization.id)
              .first()
          )?.id;
          if (otherDebtorId) {
            debtorId = otherDebtorId;
          } else {
            await db('debtors').update({
              organization_id: existingOrganization.id,
            });
          }
        } else {
          updateOrganizationFields.pib = pib;
        }
      }

      if (Object.keys(updateOrganizationFields).length > 0) {
        await db('organizations')
          .where('id', existingOrganization.id)
          .update(updateOrganizationFields);
      }
    }

    if (business_numbers !== undefined) {
      await db('case_business_numbers').where('case_id', caseId).del();
      if (business_numbers.length > 0) {
        await Promise.all(
          business_numbers.map(async (businessNumber: string) => {
            // Check if the business number already exists
            let existingBusinessNumberId = (
              await db('business_numbers')
                .select('id')
                .where({ number: businessNumber })
                .first()
            )?.id;

            if (!existingBusinessNumberId) {
              existingBusinessNumberId = (
                await db('business_numbers')
                  .insert({
                    number: businessNumber,
                  })
                  .returning('id')
              )[0].id;
            }

            await db('case_business_numbers').insert({
              business_number_id: existingBusinessNumberId,
              case_id: caseId,
            });
          }),
        );
      }
    }

    if (phone_numbers !== undefined) {
      await db('phone_numbers').where('debtor_id', debtorId).del();
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
                debtor_id: debtorId,
              });
            }
          }),
        );
      }
    }

    if (executor_ids !== undefined) {
      await db('case_executors').where('case_id', caseId).del();
      if (executor_ids.length > 0) {
        for (const executor_id of executor_ids) {
          await db('case_executors').insert({
            executor_id,
            case_id: caseId,
          });
        }
      }
    }

    const existingDebtor: IDebtor = await db('debtors')
      .select('id', 'cession', 'address', 'email', 'zip_code', 'city_id')
      .where('id', debtorId)
      .first();

    const updatedDebtorFields: IDebtor = {};

    if (existingDebtor) {
      if (cession !== undefined && existingDebtor.cession !== cession) {
        updatedDebtorFields.cession = cession;
      }

      if (address !== undefined && existingDebtor.address !== address) {
        updatedDebtorFields.address = address;
      }

      if (email !== undefined && existingDebtor.email !== email) {
        updatedDebtorFields.email = email;
      }

      if (zip_code !== undefined && existingDebtor.zip_code !== zip_code) {
        updatedDebtorFields.zip_code = zip_code;
      }

      if (city_id !== undefined && existingDebtor.city_id !== city_id) {
        updatedDebtorFields.city_id = city_id;
      }

      if (Object.keys(updatedDebtorFields).length > 0) {
        await db('debtors')
          .where('id', existingDebtor.id)
          .update(updatedDebtorFields);
      }
    } else {
      res.status(404);
      return mapApiToResponse(
        404,
        `message.organization_not_found`,
        existingDebtor,
      );
    }

    if (case_number !== undefined && existingCase.case_number !== case_number) {
      updatedCaseFields.case_number = case_number;
    }

    if (
      contract_number !== undefined &&
      existingCase.contract_number !== contract_number
    ) {
      updatedCaseFields.contract_number = contract_number;
    }

    if (
      closing_date !== undefined &&
      existingCase.closing_date !== closing_date
    ) {
      updatedCaseFields.closing_date = closing_date;
    }

    if (lawyer_id !== undefined && existingCase.lawyer_id !== lawyer_id) {
      updatedCaseFields.lawyer_id = lawyer_id;
    }

    if (client_id !== undefined && existingCase.client_id !== client_id) {
      updatedCaseFields.client_id = client_id;
    }

    if (court_id !== undefined && existingCase.court_id !== court_id) {
      updatedCaseFields.court_id = court_id;
    }

    if (
      ssn_number_id !== undefined &&
      existingCase.ssn_number_id !== ssn_number_id
    ) {
      updatedCaseFields.ssn_number_id = ssn_number_id;
    }

    if (package_id !== undefined && existingCase.package_id !== package_id) {
      updatedCaseFields.package_id = package_id;
    }

    if (principal !== undefined && existingCase.principal !== principal) {
      updatedCaseFields.principal = principal;
    }

    if (interest !== undefined && existingCase.interest !== interest) {
      updatedCaseFields.interest = interest;
    }

    if (debtorId && existingCase.debtor_id !== debtorId) {
      updatedCaseFields.debtor_id = debtorId;
    }

    if (Object.keys(updatedCaseFields).length > 0) {
      // Update the case with the new data
      await db('cases').where('id', caseId).update(updatedCaseFields);
    }

    // Fetch the updated case details
    const updatedCase = await db('cases').where('id', caseId).first();

    // Create an appropriate response data object
    const apiResponse: ICreateCaseApiResponseData = {
      case_id: updatedCase,
    };

    res.status(200);
    return mapApiToResponse(
      200,
      `message.case_successfully_updated`,
      apiResponse,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};