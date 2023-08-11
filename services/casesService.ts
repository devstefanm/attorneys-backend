import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ICasesListApiResponseData } from 'types/casesTypes';
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

export const getCasesListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICasesListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'asc',
      sortBy = 'c.created_at',
      size = 10,
      page = 1,
      name,
      jmbg_pib,
      case_number,
      contract_number,
      lawyer,
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCaseCasesList = 'casesList'.toUpperCase();

    const totalCountQuery = db('cases as c')
      .count('c.id as total_cases')
      .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
      .leftJoin('people as p', 'd.person_id', 'p.id')
      .leftJoin('organizations as o', 'd.organization_id', 'o.id')
      .leftJoin('lawyers as l', 'c.lawyer_id', 'l.id')
      .leftJoin('clients as cl', 'c.client_id', 'cl.id')
      .leftJoin('courts as co', 'c.court_id', 'co.id')
      .leftJoin('ssn_numbers as s', 'c.ssn_number_id', 's.id')
      .leftJoin('packages as pck', 'c.package_id', 'pck.id')
      .first();

    const casesQuery = db('cases as c')
      .select(
        'c.id',
        'c.case_number',
        'c.contract_number',
        'c.status',
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
      )
      .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
      .leftJoin('people as p', 'd.person_id', 'p.id')
      .leftJoin('organizations as o', 'd.organization_id', 'o.id')
      .leftJoin('lawyers as l', 'c.lawyer_id', 'l.id')
      .leftJoin('clients as cl', 'c.client_id', 'cl.id')
      .leftJoin('courts as co', 'c.court_id', 'co.id')
      .leftJoin('ssn_numbers as s', 'c.ssn_number_id', 's.id')
      .leftJoin('packages as pck', 'c.package_id', 'pck.id')
      .offset(offset)
      .limit(Number(size));

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
      case 'cession':
        casesQuery.orderBy('d.cession', sort as string);
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
      case 'principal':
        casesQuery.orderBy('c.principal', sort as string);
        break;
      case 'interest':
        casesQuery.orderBy('c.interest', sort as string);
        break;
      default:
        casesQuery.orderBy('c.created_at', 'asc');
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

    const [totalCountResult, cases] = await Promise.all([
      totalCountQuery,
      casesQuery,
    ]);

    if (cases.length === 0 || !totalCountResult) {
      res.status(404);
      return mapApiToResponse(404, `${upperCaseCasesList}.NOT_FOUND`);
    }

    const totalCases = Number(totalCountResult.total_cases);
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
