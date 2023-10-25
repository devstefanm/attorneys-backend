import { Worksheet } from 'exceljs';
import { Knex } from 'knex';
import { HeadersRecord } from 'services/casesServices/casesServicesData';
import {
  ICase,
  ICaseApiResponseData,
  ICaseForExport,
  ICaseForImport,
} from 'types/casesTypes';
import { debtorNameGenerator, jmbgAndPibGenerator } from './universalHelpers';
import { db } from 'attorneys-db';
import { formatDateToDDMMYYYY } from 'utils/transformData';
import { ICaseTransaction } from 'types/transactionsTypes';

type QueryBuilder = Knex.QueryBuilder<any, any>;

export const buildCasesNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  if (term.includes(' ')) {
    const [firstName, lastName] = term.split(' ');

    builder
      .orWhere(function () {
        this.where(function () {
          this.whereRaw('LOWER(p.first_name) = ?', [
            firstName.toLowerCase(),
          ]).andWhereRaw('LOWER(p.last_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]);
        }).orWhere(function () {
          this.whereRaw('LOWER(p.first_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName.toLowerCase()]);
        });
      })
      .orWhere(function () {
        this.where(function () {
          this.whereRaw('LOWER(p.first_name) LIKE ?', [
            `%${firstName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(p.last_name) = ?', [lastName.toLowerCase()]);
        }).orWhere(function () {
          this.whereRaw('LOWER(p.first_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName.toLowerCase()]);
        });
      })
      .orWhereRaw('LOWER(o.name) LIKE ?', [`%${term.toLowerCase()}%`]);
  } else {
    builder.orWhere(function () {
      this.whereRaw('LOWER(p.first_name) LIKE ?', [`%${term.toLowerCase()}%`])
        .orWhereRaw('LOWER(p.last_name) LIKE ?', [`%${term.toLowerCase()}%`])
        .orWhereRaw('LOWER(o.name) LIKE ?', [`%${term.toLowerCase()}%`]);
    });
  }
};

export const buildLawyerNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  if (term.includes(' ')) {
    const [firstName, lastName] = term.split(' ');

    builder
      .orWhere(function () {
        this.where(function () {
          this.whereRaw('LOWER(l.first_name) = ?', [
            firstName.toLowerCase(),
          ]).andWhereRaw('LOWER(l.last_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]);
        }).orWhere(function () {
          this.whereRaw('LOWER(l.first_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(l.last_name) = ?', [firstName.toLowerCase()]);
        });
      })
      .orWhere(function () {
        this.where(function () {
          this.whereRaw('LOWER(l.first_name) LIKE ?', [
            `%${firstName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(l.last_name) = ?', [lastName.toLowerCase()]);
        }).orWhere(function () {
          this.whereRaw('LOWER(l.first_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(l.last_name) = ?', [firstName.toLowerCase()]);
        });
      })
      .orWhereRaw('LOWER(l.office_name) LIKE ?', [`%${term.toLowerCase()}%`]);
  } else {
    builder.orWhere(function () {
      this.whereRaw('LOWER(l.first_name) LIKE ?', [`%${term.toLowerCase()}%`])
        .orWhereRaw('LOWER(l.last_name) LIKE ?', [`%${term.toLowerCase()}%`])
        .orWhereRaw('LOWER(l.office_name) LIKE ?', [`%${term.toLowerCase()}%`]);
    });
  }
};

export const generateJmbgAndPibSearchQuery = (
  query: QueryBuilder,
  searchNumber: string,
) => {
  query.where(function () {
    this.orWhereRaw('p.jmbg::text LIKE ?', [`%${searchNumber}%`]).orWhereRaw(
      'o.pib::text LIKE ?',
      [`%${searchNumber}%`],
    );
  });

  return query;
};

export const identifySearchedString = (
  search: string,
): 'case_number' | 'debtors_name' | 'unknown' => {
  const numberPattern = /^[0-9]+$/;
  const letterPattern = /^[A-Za-z]+$/;

  if (numberPattern.test(search)) {
    return 'case_number';
  } else if (letterPattern.test(search)) {
    return 'debtors_name';
  } else {
    return 'unknown'; // You can return a default value or handle other cases as needed
  }
};

export const buildPeopleNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  if (term.includes(' ')) {
    const [firstName, lastName] = term.split(' ');

    builder
      .orWhere(function () {
        this.where(function () {
          this.whereRaw('LOWER(p.first_name) = ?', [
            firstName.toLowerCase(),
          ]).andWhereRaw('LOWER(p.last_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]);
        }).orWhere(function () {
          this.whereRaw('LOWER(p.first_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName.toLowerCase()]);
        });
      })
      .orWhere(function () {
        this.where(function () {
          this.whereRaw('LOWER(p.first_name) LIKE ?', [
            `%${firstName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(p.last_name) = ?', [lastName.toLowerCase()]);
        }).orWhere(function () {
          this.whereRaw('LOWER(p.first_name) LIKE ?', [
            `%${lastName.toLowerCase()}%`,
          ]).andWhereRaw('LOWER(p.last_name) = ?', [firstName.toLowerCase()]);
        });
      });
  } else {
    builder.orWhere(function () {
      this.whereRaw('LOWER(p.first_name) LIKE ?', [
        `%${term.toLowerCase()}%`,
      ]).orWhereRaw('LOWER(p.last_name) LIKE ?', [`%${term.toLowerCase()}%`]);
    });
  }
};

export const transformCasesArraysToIndexedFields = (casesResults: ICase[]) => {
  let transformedCases: ICaseForExport[] = casesResults as ICaseForExport[];
  return transformedCases.map((casesResult) => {
    let {
      entering_date,
      lawyer_hand_over_date,
      closing_date,
      phone_numbers,
      business_numbers,
      executors,
    } = casesResult;

    if (entering_date) {
      entering_date = formatDateToDDMMYYYY(entering_date as string);
    }

    if (entering_date) {
      lawyer_hand_over_date = formatDateToDDMMYYYY(
        lawyer_hand_over_date as string,
      );
    }

    if (entering_date) {
      closing_date = formatDateToDDMMYYYY(closing_date as string);
    }

    // Transform phone_numbers into phone_number_N format
    if (
      typeof phone_numbers !== 'string' &&
      phone_numbers &&
      phone_numbers.length > 0
    ) {
      for (let index = 0; index < 4; index++) {
        casesResult[`phone_number_${index + 1}`] = phone_numbers[index] || '';
      }
      delete casesResult.phone_numbers;
    }

    // Transform business_numbers into business_number_N format
    if (
      typeof business_numbers !== 'string' &&
      business_numbers &&
      business_numbers.length > 0
    ) {
      for (let index = 0; index < 2; index++) {
        casesResult[`business_number_${index + 1}`] =
          business_numbers[index] || '';
      }
      delete casesResult.business_numbers;
    }

    // Transform executors into executors_N format
    if (typeof executors !== 'string' && executors && executors.length > 0) {
      for (let index = 0; index < 2; index++) {
        casesResult[`executor_${index + 1}`] = executors[index] || '';
      }
      delete casesResult.executors;
    }

    return casesResult;
  });
};

export const reverseHeaderMapping = (importedHeaders: string[]): string[] => {
  const reversedHeaders = importedHeaders.map((header) => {
    // Try to find a matching header in the reverse mapping
    const reversedHeader = Object.keys(HeadersRecord).find(
      (key) => HeadersRecord[key] === header,
    );

    // Use the original header if a match is found, or keep the imported header
    return reversedHeader || header;
  });

  return reversedHeaders;
};

export const transformIndexedFieldsToCasesArrays = (
  rowDataObject: ICaseForImport,
): ICaseForImport => {
  rowDataObject.phone_numbers = [];
  rowDataObject.executors = [];
  rowDataObject.business_numbers = [];

  for (let i = 1; i <= 4; i++) {
    if (
      rowDataObject[`phone_number_${i}`] !== undefined &&
      rowDataObject[`phone_number_${i}`] !== ''
    ) {
      rowDataObject.phone_numbers.push(
        rowDataObject[`phone_number_${i}`] as string,
      );
    }
    delete rowDataObject[`phone_number_${i}`];

    if (
      rowDataObject[`executor_${i}`] !== undefined &&
      rowDataObject[`executor_${i}`] !== ''
    ) {
      rowDataObject.executors.push(rowDataObject[`executor_${i}`] as string);
    }
    delete rowDataObject[`executor_${i}`];

    if (
      rowDataObject[`business_number_${i}`] !== undefined &&
      rowDataObject[`business_number_${i}`] !== ''
    ) {
      rowDataObject.business_numbers.push(
        rowDataObject[`business_number_${i}`] as string,
      );
    }
    delete rowDataObject[`business_number_${i}`];
  }
  return rowDataObject;
};

export const splitLawyerName = (
  name: string,
): {
  lawyer_first_name: string;
  lawyer_last_name: string;
  lawyer_office_name: string | undefined;
} => {
  const fullLawyerArr = name.split('(');
  const lawyerName = fullLawyerArr[0].split(' ');

  let lawyer_first_name = lawyerName.shift() as string;
  let lawyer_last_name = lawyerName.join(' ').replace(/\s+$/, '');
  let lawyer_office_name = fullLawyerArr[1]
    ? fullLawyerArr[1].replace(')', '')
    : undefined;

  return {
    lawyer_first_name,
    lawyer_last_name,
    lawyer_office_name,
  };
};

export const transformParsedDataToCase = (
  rowDataObject: ICaseForImport,
): ICaseForImport => {
  let transformedRowDataObject =
    transformIndexedFieldsToCasesArrays(rowDataObject);

  // Transform 'DA' to true and 'NE' to false
  Object.keys(transformedRowDataObject).forEach((key) => {
    if (
      transformedRowDataObject[key] === 'DA' ||
      transformedRowDataObject[key] === 'NE'
    ) {
      const uppercasedRowDataObj = (
        transformedRowDataObject[key] as string
      )?.toUpperCase();
      if (key === 'state') {
        transformedRowDataObject[key] =
          uppercasedRowDataObj === 'DA'
            ? 'active'
            : uppercasedRowDataObj === 'NE'
            ? 'closed'
            : uppercasedRowDataObj;
      } else if (key === 'is_legal') {
        transformedRowDataObject[key] =
          uppercasedRowDataObj === 'FIZICKO' ||
          uppercasedRowDataObj === 'FIZIČKO'
            ? false
            : true;
      } else {
        transformedRowDataObject[key] = uppercasedRowDataObj === 'DA';
      }
    }
  });

  // Transform 'principal' and 'interest' to numbers
  const numberFields = ['principal', 'interest'];
  numberFields.forEach((field) => {
    if (
      transformedRowDataObject[field] &&
      typeof transformedRowDataObject[field] === 'string'
    ) {
      transformedRowDataObject[field] = parseFloat(
        (transformedRowDataObject[field] as string)?.replace(',', ''),
      );
    }
  });

  // Split lawyer name into first name, last name, and office name
  if (transformedRowDataObject['lawyer']) {
    const { lawyer_first_name, lawyer_last_name, lawyer_office_name } =
      splitLawyerName(transformedRowDataObject['lawyer'] as string);
    transformedRowDataObject['lawyer_first_name'] = lawyer_first_name;
    transformedRowDataObject['lawyer_last_name'] = lawyer_last_name;
    transformedRowDataObject['lawyer_office_name'] = lawyer_office_name;
    delete transformedRowDataObject['lawyer'];
  }

  transformedRowDataObject = jmbgAndPibGenerator(transformedRowDataObject);

  transformedRowDataObject = debtorNameGenerator(transformedRowDataObject);

  return transformedRowDataObject;
};

export function generateRandomString(length: number) {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }

  return randomString;
}

export const generateQueryColumns = (
  checkedProps: string[],
): { selectColumns: any[]; groupByColumns: string[] } => {
  const selectColumns: any[] = [];
  const groupByColumns: string[] = [];

  if (checkedProps) {
    const caseProps = [
      'case_number',
      'contract_number',
      'principal',
      'interest',
      'old_payment',
      'our_taxes',
      'warning_price',
      'closing_date',
      'entering_date',
      'lawyer_hand_over_date',
      'comment',
    ];
    const debtorProps = ['address', 'email', 'zip_code'];

    for (const caseProp of caseProps) {
      if (checkedProps.includes(caseProp)) {
        selectColumns.push(`c.${caseProp}`);
        groupByColumns.push(`c.${caseProp}`);
      }
    }

    for (const debtorProp of debtorProps) {
      if (checkedProps.includes(debtorProp)) {
        selectColumns.push(`d.${debtorProp}`);
        groupByColumns.push(`d.${debtorProp}`);
      }
    }

    if (checkedProps.includes('ssn')) {
      selectColumns.push('s.ssn as ssn');
      groupByColumns.push('s.ssn');
    }

    if (checkedProps.includes('package')) {
      selectColumns.push('pck.package_name as package');
      groupByColumns.push('pck.package_name');
    }

    if (checkedProps.includes('status')) {
      selectColumns.push('st.name as status');
      groupByColumns.push('st.name');
    }

    if (checkedProps.includes('client')) {
      selectColumns.push('cl.name as client');
      groupByColumns.push('cl.name');
    }

    if (checkedProps.includes('court')) {
      selectColumns.push('co.name as court');
      groupByColumns.push('co.name');
    }

    if (checkedProps.includes('status')) {
      selectColumns.push('st.name as status');
      groupByColumns.push('st.name');
    }

    if (checkedProps.includes('limitation_objection')) {
      selectColumns.push(
        db.raw(
          "CASE WHEN c.limitation_objection = true THEN 'DA' ELSE 'NE' END AS limitation_objection",
        ),
      );
      groupByColumns.push('c.limitation_objection');
    }

    if (checkedProps.includes('is_legal')) {
      selectColumns.push(
        db.raw(
          "CASE WHEN d.is_legal = true THEN 'PRAVNO' ELSE 'FIZICKO' END AS is_legal",
        ),
      );
      groupByColumns.push('d.is_legal');
    }

    if (checkedProps.includes('cession')) {
      selectColumns.push(
        db.raw("CASE WHEN d.cession = true THEN 'DA' ELSE 'NE' END AS cession"),
      );
      groupByColumns.push('d.cession');
    }

    if (checkedProps.includes('state')) {
      selectColumns.push(
        db.raw("CASE WHEN c.state = 'active' THEN 'DA' ELSE 'NE' END AS state"),
      );
      groupByColumns.push('c.state');
    }

    if (checkedProps.includes('employed')) {
      selectColumns.push(
        db.raw(
          "CASE WHEN p.employed = true THEN 'DA' ELSE 'NE' END AS employed",
        ),
      );
      groupByColumns.push('p.employed');
    }

    if (checkedProps.includes('jmbg_pib')) {
      selectColumns.push(
        db.raw(
          'CASE WHEN d.is_legal = false OR p.jmbg IS NOT NULL THEN p.jmbg ELSE o.pib END AS jmbg_pib',
        ),
      );
      groupByColumns.push('p.jmbg', 'o.pib');
    }

    if (checkedProps.includes('name')) {
      selectColumns.push(
        db.raw(
          "CASE WHEN d.is_legal = false OR (p.first_name IS NOT NULL AND p.last_name IS NOT NULL) THEN CONCAT(p.first_name, ' ', p.last_name) ELSE o.name END AS name",
        ),
      );
      groupByColumns.push('p.first_name', 'p.last_name', 'o.name');
    }

    if (checkedProps.includes('lawyer')) {
      selectColumns.push(
        db.raw(
          "CONCAT(l.first_name, ' ', l.last_name, CASE WHEN l.office_name IS NOT NULL THEN CONCAT(' (', l.office_name, ')') ELSE '' END) AS lawyer",
        ),
      );
      groupByColumns.push('l.first_name', 'l.last_name', 'l.office_name');
    }

    if (checkedProps.includes('employer')) {
      selectColumns.push(
        db.raw(
          'CASE WHEN COUNT(emp.id) = 0 THEN null ELSE emp.name END as employer',
        ),
      );
      groupByColumns.push('emp.id', 'emp.name');
    }

    if (checkedProps.includes('city')) {
      selectColumns.push(
        db.raw('CASE WHEN COUNT(ci.id) = 0 THEN null ELSE ci.name END as city'),
      );
      groupByColumns.push('ci.id', 'ci.name');
    }

    if (checkedProps.includes('executors')) {
      selectColumns.push(
        db.raw(
          "array_agg(distinct e.first_name || ' ' || e.last_name) as executors",
        ),
      );
    }

    if (checkedProps.includes('business_numbers')) {
      selectColumns.push(
        db.raw('array_agg(distinct bn.number) as business_numbers'),
      );
    }

    if (checkedProps.includes('phone_numbers')) {
      selectColumns.push(
        db.raw('array_agg(distinct pn.number) as phone_numbers'),
      );
    }
  }

  if (
    !checkedProps.includes('is_legal') &&
    (checkedProps.includes('jmbg_pib') || checkedProps.includes('name'))
  ) {
    groupByColumns.push('d.is_legal');
  }

  return {
    selectColumns,
    groupByColumns,
  };
};

export const calculateTypeSums = (
  transactions: ICaseTransaction[],
): Record<string, number> => {
  const typeSums: Record<string, number> = {};

  for (const transaction of transactions) {
    const { amount, type } = transaction;
    const amountValue = parseFloat(amount);

    if (!isNaN(amountValue)) {
      if (typeSums[type]) {
        typeSums[type] += amountValue;
      } else {
        typeSums[type] = amountValue;
      }
    }
  }

  for (const type in typeSums) {
    if (typeSums.hasOwnProperty(type)) {
      typeSums[type] = parseFloat(typeSums[type].toFixed(2));
    }
  }

  return typeSums;
};

export const calculateCurrentDebt = (
  editCaseForm: ICaseApiResponseData,
  transactions: Record<string, number>,
): number => {
  const { principal, interest, warning_price } = editCaseForm;

  let principalValue = principal ? parseFloat(String(principal)) : 0;
  let interestValue = interest ? parseFloat(String(interest)) : 0;
  let warningPriceValue = warning_price ? parseFloat(String(warning_price)) : 0;

  if (isNaN(principalValue)) {
    principalValue = 0;
  }

  if (isNaN(interestValue)) {
    interestValue = 0;
  }

  if (isNaN(warningPriceValue)) {
    warningPriceValue = 0;
  }

  let currentDebt: number = principalValue + interestValue + warningPriceValue;
  // Calculate current_debt based on transactions
  if (transactions) {
    currentDebt =
      currentDebt +
      (transactions['fee'] || 0) +
      (transactions['legal_fee'] || 0) -
      (transactions['withdrawal'] || 0) -
      (transactions['payment'] || 0);
  }

  return parseFloat(currentDebt.toFixed(2));
};
