import { Request, Response } from 'express';
import { Knex } from 'knex';
import { ISSNNumber } from 'types/ssnNumbersTypes';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { specialCharactersChecker } from './universalHelpers';
import { db } from 'attorneys-db';

export const generateSSNNumberSearchQuery = (
  query: Knex.QueryBuilder,
  searchTerms: string[],
) => {
  query.where(function () {
    for (const term of searchTerms) {
      this.orWhere(function () {
        this.whereRaw('LOWER(ssn) LIKE ?', [`%${term.toLowerCase()}%`]);
      });
    }
  });

  return query;
};

export const getSSNNumbersServiceTemplate = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ISSNNumber[] | undefined>> => {
  const { search } = req.query; // The search term is passed as a query parameter
  const searchTerm = search as string;
  // Query the table based on the search term
  let query = db('ssn_numbers').select('ssn', 'id');

  const upperCaseEntity = 'ssn_numbers'.toUpperCase();

  if (search) {
    const searchTerms = specialCharactersChecker(searchTerm);
    generateSSNNumberSearchQuery(query, searchTerms);
  }

  const ssnNumbers: ISSNNumber[] = await query;

  if (ssnNumbers.length <= 0) {
    res.status(404);
    return mapApiToResponse(404, `${upperCaseEntity}.NOT_FOUND`);
  }

  res.status(200);
  return mapApiToResponse(
    200,
    `${upperCaseEntity}.SUCCESSFULY_RETRIEVED_NAMES`,
    ssnNumbers,
  );
};
