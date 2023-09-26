import ExcelJS from 'exceljs';
import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import {
  generateBigIntSearchQuery,
  generateShortNameSearchQuery,
  specialCharactersChecker,
} from '../helpers/universalHelpers';
import {
  buildLawyerNameSearchConditions,
  buildCasesNameSearchConditions,
  generateJmbgAndPibSearchQuery,
  transformCasesArraysToIndexedFields,
  generateQueryColumns,
} from '../helpers/casesHelpers';
import { generateCSVFile, generateExcelFile } from 'utils/fileGenerationUtil';
import { HeadersRecord } from './casesServicesData';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import catchErrorStack from 'utils/catchErrorStack';

export const exportCasesListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ExcelJS.Buffer | string | undefined>> => {
  try {
    const {
      name,
      jmbg_pib,
      case_number,
      contract_number,
      lawyer,
      executors,
      ssn,
      package: package_name,
      business_numbers,
      filter = 'active',
      clientsFilter = '',
      fileType = 'excel', // 'excel' or 'csv'
      checkedProps,
    } = req.body;

    const queryColumns = generateQueryColumns(checkedProps);

    if (checkedProps.length === 0 || queryColumns.groupByColumns.length === 0) {
      res.status(400);
      return mapApiToResponse(400, `errors.noValidExportFieldsChecked`);
    }

    const casesQuery = db('cases as c')
      .select(...queryColumns.selectColumns)
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
      .leftJoin('case_business_numbers as cbn', 'c.id', 'cbn.case_id')
      .leftJoin('business_numbers as bn', 'cbn.business_number_id', 'bn.id')
      .leftJoin('cities as ci', 'd.city_id', 'ci.id')
      .leftJoin('employers as emp', 'p.employer_id', 'emp.id')
      .leftJoin('phone_numbers as pn', 'd.id', 'pn.debtor_id')
      .groupBy(...(queryColumns.groupByColumns as string[]));

    if (filter) {
      casesQuery.where('c.state', filter);
    }

    if (clientsFilter) {
      casesQuery.where('c.client_id', clientsFilter);
    }

    if (name) {
      const nameForSearch = name as string;
      const namesArr = specialCharactersChecker(nameForSearch);
      casesQuery.where(function () {
        for (const term of namesArr) {
          buildCasesNameSearchConditions(this, term);
        }
      });
    }

    if (jmbg_pib) {
      const jmbgPibNumber = jmbg_pib as string;
      generateJmbgAndPibSearchQuery(casesQuery, jmbgPibNumber);
    }

    if (case_number) {
      const caseNumber = case_number as string;
      generateBigIntSearchQuery(casesQuery, caseNumber, 'c.case_number');
    }

    if (contract_number) {
      const contractNumber = contract_number as string;
      generateBigIntSearchQuery(
        casesQuery,
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
    }

    if (ssn) {
      const ssnNumber = ssn as string;
      generateBigIntSearchQuery(casesQuery, ssnNumber, 's.ssn');
    }

    if (package_name) {
      const packageName = package_name as string;
      const packageNamesArr = specialCharactersChecker(packageName);
      generateShortNameSearchQuery(
        casesQuery,
        packageNamesArr,
        'pck.package_name',
      );
    }

    if (business_numbers) {
      const businesNumberForSearch = business_numbers as string;
      const businesNumbersArr = specialCharactersChecker(
        businesNumberForSearch,
      );
      const conditions = businesNumbersArr.map((searchTerm) => {
        return db.raw("string_agg(distinct bn.number, ', ') ILIKE ?", [
          `%${searchTerm}%`,
        ]);
      });

      casesQuery.havingRaw(conditions.map((c) => `(${c})`).join(' OR '));
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
    }

    const cases = await casesQuery;

    const transformedCases = transformCasesArraysToIndexedFields(cases);
    if (transformedCases.length === 0) {
      res.status(404);
      return mapApiToResponse(
        404,
        `errors.notFound`,
        String(transformedCases.length),
      );
    }

    let fileData: ExcelJS.Buffer | string = '';

    if (fileType === 'excel') {
      // Generate Excel file from casesData
      fileData = await generateExcelFile(
        transformedCases,
        HeadersRecord,
        'Cases',
      );
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.setHeader('Content-Disposition', 'attachment; filename=cases.xlsx');
    } else if (fileType === 'csv') {
      // Generate CSV file from casesData
      fileData = await generateCSVFile(transformedCases, HeadersRecord);

      // Set the response headers to indicate a CSV file download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="cases.csv"');
    } else {
      res.status(400);
      return mapApiToResponse(400, `errors.invalidFileType`, fileData);
    }

    return mapApiToResponse(200, `messages.fileExportSuccess`, fileData);
  } catch (error) {
    res.status(500);
    return catchErrorStack(res, error);
  }
};
