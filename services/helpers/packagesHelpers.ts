import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { Knex } from 'knex';
import { IPackage } from 'types/packagesTypes';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { specialCharactersChecker } from './universalHelpers';

type QueryBuilder = Knex.QueryBuilder<any, any>;

export const buildPackagesNameSearchConditions = (
  builder: QueryBuilder,
  term: string,
) => {
  builder.orWhere(function () {
    this.whereRaw('LOWER(pck.package_name) LIKE ?', [
      `%${term.toLowerCase()}%`,
    ]);
  });
};

export const generatePackagesNameSearchQuery = (
  query: Knex.QueryBuilder,
  searchTerms: string[],
) => {
  query.where(function () {
    for (const term of searchTerms) {
      this.orWhere(function () {
        this.whereRaw('LOWER(package_name) LIKE ?', [
          `%${term.toLowerCase()}%`,
        ]);
      });
    }
  });

  return query;
};

export const getPackagesNamesServiceTemplate = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IPackage[] | undefined>> => {
  const { search } = req.query; // The search term is passed as a query parameter
  const searchTerm = search as string;
  // Query the table based on the search term
  let query = db('packages').select('package_name', 'id');

  const upperCaseEntity = 'packages'.toUpperCase();

  if (search) {
    const searchTerms = specialCharactersChecker(searchTerm);
    generatePackagesNameSearchQuery(query, searchTerms);
  }

  const names: IPackage[] = await query;

  if (names.length <= 0) {
    res.status(404);
    return mapApiToResponse(404, `${upperCaseEntity}.NOT_FOUND`);
  }

  res.status(200);
  return mapApiToResponse(
    200,
    `${upperCaseEntity}.SUCCESSFULY_RETRIEVED_NAMES`,
    names,
  );
};
