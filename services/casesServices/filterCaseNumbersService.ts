import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { Knex } from 'knex';
import {
  buildPeopleNameSearchConditions,
  identifySearchedString,
} from 'services/helpers/casesHelpers';
import {
  generateBigIntSearchQuery,
  specialCharactersChecker,
} from 'services/helpers/universalHelpers';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse from 'utils/mapApiToResponse';

export const filterCaseNumbersService = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchName = search as string;
    const searchType = identifySearchedString(searchName);
    let caseNumbersQuery: Knex.QueryBuilder;

    if (
      !searchName ||
      searchType === 'case_number' ||
      searchType === 'unknown'
    ) {
      caseNumbersQuery = db('cases as c')
        .select(
          'c.id',
          'c.case_number',
          'p.first_name',
          'p.last_name',
          'o.name',
        )
        .leftJoin('debtors as d', 'c.debtor_id', 'd.id')
        .leftJoin('people as p', 'd.person_id', 'p.id')
        .leftJoin('organizations as o', 'd.organization_id', 'o.id')
        .limit(25);

      if (searchName) {
        generateBigIntSearchQuery(
          caseNumbersQuery,
          searchName,
          'c.case_number',
        );
      }
      const caseNumbers = await caseNumbersQuery;

      if (caseNumbers.length === 0) {
        res.status(404);
        return mapApiToResponse(
          404,
          'filterCaseNumbers.not_found',
          caseNumbers,
        );
      }

      res.status(200);
      return mapApiToResponse(
        200,
        'filterCaseNumbers.successfully_retrieved',
        caseNumbers,
      );
    }

    if (searchType === 'debtors_name') {
      const namesArr = specialCharactersChecker(searchName);
      caseNumbersQuery = db('people as p')
        .select(
          db.raw('c.id::text'),
          db.raw('c.case_number::text'),
          'p.first_name',
          'p.last_name',
          db.raw('NULL as name'),
        )
        .leftJoin('debtors as d', 'p.id', 'd.person_id')
        .leftJoin('cases as c', 'd.id', 'c.debtor_id')
        .where(function () {
          for (const term of namesArr) {
            buildPeopleNameSearchConditions(this, term);
          }
        })
        .union(function () {
          this.select(
            'o.name',
            db.raw('ca.id::text'),
            db.raw('ca.case_number::text'),
            db.raw('NULL as first_name'),
            db.raw('NULL as last_name'),
          )
            .from('organizations as o')
            .leftJoin('debtors as de', 'o.id', 'de.organization_id')
            .leftJoin('cases as ca', 'de.id', 'ca.debtor_id')
            .where(function () {
              for (const term of namesArr) {
                this.orWhere(function () {
                  this.whereRaw(`LOWER(o.name) LIKE ?`, [
                    `%${term.toLowerCase()}%`,
                  ]);
                });
              }
            });
        });
      const caseNumbers = await caseNumbersQuery;

      if (caseNumbers.length === 0) {
        res.status(404);
        return mapApiToResponse(
          404,
          'filterCaseNumbers.not_found',
          caseNumbers,
        );
      }

      res.status(200);
      return mapApiToResponse(
        200,
        'filterCaseNumbers.successfully_retrieved',
        caseNumbers,
      );
    }

    res.status(404);
    return mapApiToResponse(404, 'filterCaseNumbers.not_found', []);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
