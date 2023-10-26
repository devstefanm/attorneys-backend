import { Request, Response } from 'express';
import {
  ITransactionForImport,
  ITransactionForList,
} from 'types/transactionsTypes';
import mapApiToResponse from 'utils/mapApiToResponse';
import ExcelJS from 'exceljs';
import {
  reverseHeaderMapping,
  transformTransactionType,
  trimSemicolons,
} from 'services/helpers/transactionsHelpers';
import { db } from 'attorneys-db';
import catchErrorStack from 'utils/catchErrorStack';

export const importTransactionsListService = async (
  req: Request,
  res: Response,
) => {
  try {
    if (!req.file) {
      res.status(400);
      return mapApiToResponse(400, `errors.noFile`);
    }

    const uploadedFile = req.file;

    const fileExtension = uploadedFile.originalname.split('.').pop();

    const transactions: ITransactionForList[] = [];

    if (fileExtension === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(uploadedFile.buffer);

      const worksheet = workbook.worksheets[0];

      // Get the header row to use as keys for objects
      const headerRow = worksheet.getRow(1).values as string[];

      const reversedHeaders = reverseHeaderMapping(headerRow);

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          // Skip the header row if present
          const rowData = row.values as ExcelJS.CellValue[];
          const rowDataObject: ITransactionForImport = {};

          // Create an object with keys from headers and values from the row
          reversedHeaders.forEach((header, index) => {
            rowDataObject[header] = rowData[index];
          });

          if (
            rowDataObject.amount &&
            typeof rowDataObject.amount === 'string'
          ) {
            rowDataObject.amount = parseFloat(
              (rowDataObject.amount as string)?.replace(',', ''),
            );
          }

          rowDataObject.type = transformTransactionType(
            rowDataObject.type as string,
          );

          transactions.push(rowDataObject);
        }
      });
    } else if (fileExtension === 'csv') {
      const csvBuffer = req.file.buffer;

      let headers: string[] = [];
      csvBuffer
        .toString()
        .split('\n')
        .forEach((line, index) => {
          if (!line.trim()) {
            return;
          }

          line = line.replace(/\r/g, '');

          if (index === 0) {
            headers.push(...line.split(','));
            headers = headers.map((header) => trimSemicolons(header));
            headers = reverseHeaderMapping(headers);
          } else {
            const dataRow = line.split(',');
            const rowDataObject: ITransactionForImport = {};
            let skipRow = false;

            headers.forEach((header, columnIndex) => {
              if (dataRow[columnIndex] === undefined) {
                skipRow = true;
                return;
              }
              rowDataObject[header] = trimSemicolons(dataRow[columnIndex]);
            });
            if (
              rowDataObject.amount &&
              typeof rowDataObject.amount === 'string'
            ) {
              rowDataObject.amount = parseFloat(
                (rowDataObject.amount as string)?.replace(',', ''),
              );
            }

            rowDataObject.type = transformTransactionType(
              rowDataObject.type as string,
            );

            if (!skipRow) {
              transactions.push(rowDataObject);
            }
          }
        });
    }

    const validationErrors: string[] = [];
    const newTransactionIds: number[] = [];

    for (const transaction of transactions) {
      let { amount, payment_date, type, case_number } = transaction;

      if (!case_number) {
        validationErrors.push(
          `entities.amount->${amount}->errors.errors.noCaseNumber`,
        );
      }

      if (!amount) {
        validationErrors.push(
          `entities.caseNumber->${case_number}->errors.noAmount`,
        );
      }

      if (!type) {
        validationErrors.push(
          `entities.caseNumber->${case_number}->errors.noType`,
        );
      }

      if (
        type &&
        !['payment', 'fee', 'legal_fee', 'withdrawal'].includes(type)
      ) {
        validationErrors.push(
          `entities.caseNumber->${case_number}->errors.wrongType`,
        );
      }

      if (!payment_date) {
        validationErrors.push(
          `entities.caseNumber->${case_number}->errors.noPaymentDate`,
        );
      }

      const caseId = (
        await db('cases').select('id').where('case_number', case_number).first()
      )?.id;

      if (!caseId) {
        validationErrors.push(
          `entities.caseNumber->${case_number}->errors.caseNumberWithoutCase`,
        );
      }

      if (typeof payment_date === 'string') {
        const parts = (payment_date as string).split('.');
        if (parts.length === 3) {
          payment_date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        } else {
          validationErrors.push(
            `entities.caseNumber->${case_number}->errors.paymentDateWrongFormat`,
          );
        }
      }
    }

    if (validationErrors.length > 0) {
      res.status(400);
      return mapApiToResponse(400, validationErrors);
    }

    for (const transaction of transactions) {
      let { amount, case_id, payment_date, posting_method, type, case_number } =
        transaction;

      const caseId = (
        await db('cases').select('id').where('case_number', case_number).first()
      )?.id;

      case_id = caseId;

      const newTransactionId = (
        await db('transactions')
          .insert({
            amount,
            type,
            case_id,
            payment_date,
            posting_method,
          })
          .returning('id')
      )[0]?.id;

      newTransactionIds.push(newTransactionId);
    }

    res.status(200);
    return mapApiToResponse(
      200,
      `messages.fileImportSuccess`,
      newTransactionIds.length,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
