import { db } from 'attorneys-db';
import ExcelJS from 'exceljs';
import { Request, Response } from 'express';
import { buildCasesNameSearchConditions } from 'services/helpers/casesHelpers';
import {
  generateBigIntSearchQuery,
  specialCharactersChecker,
} from 'services/helpers/universalHelpers';
import { ETransactionType, ITransaction } from 'types/transactionsTypes';
import { generateCSVFile, generateExcelFile } from 'utils/fileGenerationUtil';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { formatDateToDDMMYYYY } from 'utils/transformData';
import { HeadersRecord } from './transactionsServicesData';
import catchErrorStack from 'utils/catchErrorStack';
import { transformTypeForExport } from 'services/helpers/transactionsHelpers';

export const exportTransactionsListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ExcelJS.Buffer | string | undefined>> => {
  try {
    const {
      // posting_method,
      debtors_name,
      amount,
      case_number,
      excerpt_number,
      filter = 'payment',
      filterableDate,
      fileType = 'excel', // 'excel' or 'csv'
    } = req.body;

    const transactionsQuery = db('transactions as t')
      .select('t.type', 't.amount', 't.payment_date', 'c.case_number')
      .leftJoin('cases as c', 't.case_id', 'c.id')
      .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
      .leftJoin('people as p', 'd.person_id', 'p.id')
      .leftJoin('organizations as o', 'd.organization_id', 'o.id');

    if (filter) {
      transactionsQuery.where('t.type', filter);
    }

    if (filterableDate) {
      transactionsQuery.where('t.payment_date', '<', filterableDate);
    }

    if (debtors_name) {
      const nameForSearch = debtors_name as string;
      const namesArr = specialCharactersChecker(nameForSearch);
      transactionsQuery.where(function () {
        for (const term of namesArr) {
          buildCasesNameSearchConditions(this, term);
        }
      });
    }

    //   if (posting_method) {
    //     const postingMethod = posting_method as string;
    //     transactionsQuery.where(function () {
    //       this.whereRaw('LOWER(t.posting_method) LIKE ?', [
    //         `%${postingMethod.toLowerCase()}%`,
    //       ]);
    //     });
    //   }

    if (amount) {
      const amountValue = amount as string;
      generateBigIntSearchQuery(transactionsQuery, amountValue, 't.amount');
    }

    if (case_number) {
      const caseNumber = case_number as string;
      generateBigIntSearchQuery(transactionsQuery, caseNumber, 'c.case_number');
    }

    if (excerpt_number) {
      const excerptNumber = excerpt_number as string;
      generateBigIntSearchQuery(
        transactionsQuery,
        excerptNumber,
        'e.excerpt_number',
      );
    }

    const transactions = await transactionsQuery;

    if (transactions.length === 0) {
      res.status(404);
      return mapApiToResponse(404, `errors.notFound`);
    }

    const transformedTransactions = transactions.map(
      (transaction: ITransaction) => {
        transaction.payment_date = formatDateToDDMMYYYY(
          transaction.payment_date as string,
        );
        if (transaction.type) {
          transaction.type = transformTypeForExport(
            transaction.type as ETransactionType,
          );
        }

        return transaction;
      },
    );

    let fileData: ExcelJS.Buffer | string = '';

    if (fileType === 'excel') {
      // Generate Excel file from casesData
      fileData = await generateExcelFile(
        transformedTransactions,
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
      fileData = await generateCSVFile(transformedTransactions, HeadersRecord);

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
