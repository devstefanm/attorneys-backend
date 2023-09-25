import ExcelJS from 'exceljs';
import * as csv from 'csv';

// Function to generate an Excel (XLSX) file from an array of data
export const generateExcelFile = async (
  data: any[],
  headersRecord: Record<string, string>,
  worksheetName: string,
): Promise<ExcelJS.Buffer> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(worksheetName);

  for (let i = 1; i <= 52; i++) {
    let columnKey;
    if (i <= 26) {
      columnKey = String.fromCharCode(64 + i); // A-Z
    } else {
      const firstLetterIndex = Math.floor((i - 1) / 26);
      const secondLetterIndex = i % 26 === 0 ? 26 : i % 26;
      columnKey =
        String.fromCharCode(64 + firstLetterIndex) +
        String.fromCharCode(64 + secondLetterIndex); // AA-AZ
    }
    worksheet.getColumn(columnKey).width = 28;
  }

  const headers = Object.keys(data[0]);

  const keyIndexMap: Record<string, number> = {};
  Object.keys(headersRecord).forEach((key, index) => {
    keyIndexMap[key] = index;
  });

  const sortedHeaders = headers.sort((a, b) => {
    const indexA = keyIndexMap[a];
    const indexB = keyIndexMap[b];

    if (indexA !== undefined && indexB !== undefined) {
      return indexA - indexB;
    }

    if (indexA !== undefined) {
      return -1;
    }

    if (indexB !== undefined) {
      return 1;
    }

    return 0;
  });

  const transformedHeaderRows = sortedHeaders.map((key) => headersRecord[key]);

  const headerRow = worksheet.addRow(transformedHeaderRows);
  headerRow.font = { bold: true };

  const transformedHeadersRecord: { [key: string]: string } = {};

  for (const header of sortedHeaders) {
    transformedHeadersRecord[header] = headersRecord[header];
  }

  data.forEach((row) => {
    const rowData = Object.keys(transformedHeadersRecord).map(
      (header) => row[header],
    );
    worksheet.addRow(rowData);
  });

  return await workbook.xlsx.writeBuffer();
};

// Function to generate a CSV file from an array of data
export const generateCSVFile = async (
  data: any[],
  headersRecord: Record<string, string>,
) => {
  const headers = Object.values(headersRecord);

  const formattedData = data.map((item) => {
    const formattedItem: Record<string, any> = {};
    for (const key in headersRecord) {
      formattedItem[headersRecord[key]] = item[key];
    }
    return formattedItem;
  });

  return await new Promise<string>((resolve, reject) => {
    csv.stringify(
      formattedData,
      { header: true, columns: headers },
      (err, output) => {
        if (err) {
          reject(err);
        } else {
          resolve(output);
        }
      },
    );
  });
};
