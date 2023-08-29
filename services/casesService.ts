import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import {
  ICasesListApiResponseData,
  ICreateCaseApiResponseData,
} from 'types/casesTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import {
  generateBigIntSearchQuery,
  specialCharactersChecker,
} from './helpers/universalHelpers';
import {
  buildLawyerNameSearchConditions,
  buildCasesNameSearchConditions,
  generateJmbgAndPibSearchQuery,
} from './helpers/casesHelpers';
import { IPeople } from 'types/peopleTypes';
import { IOrganization } from 'types/organizationsTypes';
import { mapPhoneNumberForDisplay } from './helpers/phoneNumbersHelpers';

export const getCasesListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICasesListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'desc',
      sortBy = 'c.created_at',
      size = 25,
      page = 1,
      name,
      jmbg_pib,
      case_number,
      contract_number,
      lawyer,
      executors,
      ssn,
      package: package_name,
      court,
      client,
      filter = 'active',
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCaseCasesList = 'casesList'.toUpperCase();

    const totalCountQuery = db('cases as c')
      .select(db.raw('COUNT(DISTINCT c.id) as total_cases'))
      .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
      .leftJoin('people as p', 'd.person_id', 'p.id')
      .leftJoin('organizations as o', 'd.organization_id', 'o.id')
      .leftJoin('lawyers as l', 'c.lawyer_id', 'l.id')
      .leftJoin('clients as cl', 'c.client_id', 'cl.id')
      .leftJoin('courts as co', 'c.court_id', 'co.id')
      .leftJoin('ssn_numbers as s', 'c.ssn_number_id', 's.id')
      .leftJoin('packages as pck', 'c.package_id', 'pck.id')
      .leftJoin('statuses as st', 'c.status_id', 'st.id')
      .leftJoin('case_executors as ce', 'c.id', 'ce.case_id')
      .leftJoin('executors as e', 'ce.executor_id', 'e.id')
      .first();

    const casesQuery = db('cases as c')
      .select(
        'c.id',
        'c.case_number',
        'c.contract_number',
        'c.state',
        'c.principal',
        'c.interest',
        'd.is_legal',
        'd.cession',
        'p.first_name',
        'p.last_name',
        'p.jmbg',
        'o.name',
        'o.pib',
        'l.office_name as lawyer_office_name',
        'l.first_name as lawyer_first_name',
        'l.last_name as lawyer_last_name',
        'cl.name as client_name',
        'co.name as court_name',
        's.ssn as ssn',
        'pck.package_name as package',
        'st.name as status',
        db.raw(
          "string_agg(e.first_name || ' ' || e.last_name, ', ') as executors",
        ),
      )
      .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
      .leftJoin('people as p', 'd.person_id', 'p.id')
      .leftJoin('organizations as o', 'd.organization_id', 'o.id')
      .leftJoin('lawyers as l', 'c.lawyer_id', 'l.id')
      .leftJoin('clients as cl', 'c.client_id', 'cl.id')
      .leftJoin('courts as co', 'c.court_id', 'co.id')
      .leftJoin('ssn_numbers as s', 'c.ssn_number_id', 's.id')
      .leftJoin('packages as pck', 'c.package_id', 'pck.id')
      .leftJoin('statuses as st', 'c.status_id', 'st.id')
      .leftJoin('case_executors as ce', 'c.id', 'ce.case_id')
      .leftJoin('executors as e', 'ce.executor_id', 'e.id')
      .groupBy(
        'c.id',
        'c.case_number',
        'c.contract_number',
        'c.state',
        'c.principal',
        'c.interest',
        'd.is_legal',
        'd.cession',
        'p.first_name',
        'p.last_name',
        'p.jmbg',
        'o.name',
        'o.pib',
        'l.office_name',
        'l.first_name',
        'l.last_name',
        'cl.name',
        'co.name',
        's.ssn',
        'pck.package_name',
        'st.name',
      )
      .offset(offset)
      .limit(Number(size));

    if (filter) {
      casesQuery.where('c.state', filter);
      totalCountQuery.where('c.state', filter);
    }

    switch (sortBy) {
      case 'name':
        casesQuery
          .orderBy('p.first_name', sort as string)
          .orderBy('o.name', sort as string);
        break;
      case 'jmbg_pib':
        casesQuery
          .orderBy('p.jmbg', sort as string)
          .orderBy('o.pib', sort as string);
        break;
      case 'case_number':
        casesQuery.orderBy('p.jmbg', sort as string);
        break;
      case 'contract_number':
        casesQuery.orderBy('c.contract_number', sort as string);
        break;
      case 'lawyer':
        casesQuery
          .orderBy('l.office_name', sort as string)
          .orderBy('l.first_name', sort as string);
        break;
      case 'ssn':
        casesQuery.orderBy('s.ssn', sort as string);
        break;
      case 'package':
        casesQuery.orderBy('pck.package_name', sort as string);
        break;
      case 'client':
        casesQuery.orderBy('cl.name', sort as string);
        break;
      case 'court':
        casesQuery.orderBy('co.name', sort as string);
        break;
      case 'executors':
        casesQuery.orderBy('executors', sort as string);
        break;
      default:
        casesQuery.orderBy('c.created_at', 'desc');
        break;
    }

    if (name) {
      const nameForSearch = name as string;
      const namesArr = specialCharactersChecker(nameForSearch);
      casesQuery.where(function () {
        for (const term of namesArr) {
          buildCasesNameSearchConditions(this, term);
        }
      });
      totalCountQuery.where(function () {
        for (const term of namesArr) {
          buildCasesNameSearchConditions(this, term);
        }
      });
    }

    if (jmbg_pib) {
      const jmbgPibNumber = jmbg_pib as string;
      generateJmbgAndPibSearchQuery(casesQuery, jmbgPibNumber);
      generateJmbgAndPibSearchQuery(totalCountQuery, jmbgPibNumber);
    }

    if (case_number) {
      const caseNumber = case_number as string;
      generateBigIntSearchQuery(casesQuery, caseNumber, 'c.case_number');
      generateBigIntSearchQuery(totalCountQuery, caseNumber, 'c.case_number');
    }

    if (contract_number) {
      const contractNumber = contract_number as string;
      generateBigIntSearchQuery(
        casesQuery,
        contractNumber,
        'c.contract_number',
      );
      generateBigIntSearchQuery(
        totalCountQuery,
        contractNumber,
        'c.contract_number',
      );
    }

    if (lawyer) {
      const lawyerForSearch = lawyer as string;
      const lawyersArr = specialCharactersChecker(lawyerForSearch);
      casesQuery.where(function () {
        for (const term of lawyersArr) {
          buildLawyerNameSearchConditions(this, term);
        }
      });
      totalCountQuery.where(function () {
        for (const term of lawyersArr) {
          buildLawyerNameSearchConditions(this, term);
        }
      });
    }

    if (ssn) {
      const ssnNumber = ssn as string;
      generateBigIntSearchQuery(casesQuery, ssnNumber, 's.ssn');
      generateBigIntSearchQuery(totalCountQuery, ssnNumber, 's.ssn');
    }

    if (package_name) {
      const packageName = package_name as string;
      generateBigIntSearchQuery(casesQuery, packageName, 'pck.package_name');
      generateBigIntSearchQuery(
        totalCountQuery,
        packageName,
        'pck.package_name',
      );
    }

    if (court) {
      const courtName = court as string;
      generateBigIntSearchQuery(casesQuery, courtName, 'co.name');
      generateBigIntSearchQuery(totalCountQuery, courtName, 'co.name');
    }

    if (client) {
      const clientName = client as string;
      generateBigIntSearchQuery(casesQuery, clientName, 'cl.name');
      generateBigIntSearchQuery(totalCountQuery, clientName, 'cl.name');
    }

    if (executors) {
      const executorForSearch = executors as string;
      const executorsArr = specialCharactersChecker(executorForSearch);
      const conditions = executorsArr.map((searchTerm) => {
        return db.raw(
          "string_agg(e.first_name || ' ' || e.last_name, ', ') ILIKE ?",
          [`%${searchTerm}%`],
        );
      });

      casesQuery.havingRaw(conditions.map((c) => `(${c})`).join(' OR '));
      totalCountQuery.havingRaw(conditions.map((c) => `(${c})`).join(' OR '));
    }

    const [totalCountResult, cases] = await Promise.all([
      totalCountQuery,
      casesQuery,
    ]);

    if (cases.length === 0 || !totalCountResult) {
      res.status(404);
      return mapApiToResponse(404, `${upperCaseCasesList}.NOT_FOUND`);
    }

    const totalCases = executors
      ? cases.length
      : Number(totalCountResult.total_cases);
    const totalPages = Math.ceil(Number(totalCases) / Number(size));

    const apiResponse: ICasesListApiResponseData = {
      cases,
      meta: {
        sort: (sort as string) ?? 'asc',
        sortBy: (sortBy as string) ?? 'created_at',
        total_number: totalCases,
        total_pages: totalPages,
        page: page as number,
      },
    };

    res.status(200);
    return mapApiToResponse(
      200,
      `${upperCaseCasesList}.SUCCESSFULY_RETRIEVED_NAMES`,
      apiResponse,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};

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
      executor_id,
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

    if (executor_id) {
      await db('case_executors').insert({
        executor_id,
        case_id: newCaseId,
      });
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
