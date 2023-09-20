import ExcelJS from 'exceljs';
import * as csv from 'csv';

// Function to generate an Excel (XLSX) file from an array of data
export const generateExcelFile = async (
  data: any[],
  HeadersRecord: Record<string, string>,
  worksheetName: string,
): Promise<ExcelJS.Buffer> => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(worksheetName);

  for (let i = 1; i <= 26; i++) {
    const columnKey = String.fromCharCode(64 + i);
    worksheet.getColumn(columnKey).width = 25;
  }

  const headerRow = worksheet.addRow(Object.values(HeadersRecord));
  headerRow.font = { bold: true };

  data.forEach((row) => {
    const rowData = Object.keys(HeadersRecord).map((header) => row[header]);
    worksheet.addRow(rowData);
  });

  return await workbook.xlsx.writeBuffer();
};

// Function to generate a CSV file from an array of data
export const generateCSVFile = async (
  data: any[],
  HeadersRecord: Record<string, string>,
) => {
  const headers = Object.values(HeadersRecord);

  const formattedData = data.map((item) => {
    const formattedItem: Record<string, any> = {};
    for (const key in HeadersRecord) {
      formattedItem[HeadersRecord[key]] = item[key];
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
