import { Worksheet } from 'exceljs';
import { Knex } from 'knex';
import { ICase, ICaseForExport } from 'types/casesTypes';

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
    // Transform phone_numbers into phone_number_N format
    if (
      typeof casesResult.phone_numbers !== 'string' &&
      casesResult.phone_numbers &&
      casesResult.phone_numbers.length > 0
    ) {
      casesResult.phone_numbers.forEach((phoneNumber, index) => {
        if (phoneNumber) casesResult[`phone_number_${index + 1}`] = phoneNumber;
      });
      delete casesResult.phone_numbers;
    }

    // Transform business_numbers into business_number_N format
    if (
      typeof casesResult.business_numbers !== 'string' &&
      casesResult.business_numbers &&
      casesResult.business_numbers.length > 0
    ) {
      casesResult.business_numbers.forEach((businessNumber, index) => {
        if (businessNumber)
          casesResult[`business_number_${index + 1}`] = businessNumber;
      });
      delete casesResult.business_numbers;
    }

    // Transform executors into executors_N format
    if (
      typeof casesResult.executors !== 'string' &&
      casesResult.executors &&
      casesResult.executors.length > 0
    ) {
      casesResult.executors.forEach((executor, index) => {
        if (executor) casesResult[`executor_${index + 1}`] = executor;
      });
      delete casesResult.executors;
    }

    return casesResult;
  });
};
