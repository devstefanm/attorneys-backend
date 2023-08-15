import { Request, Response } from 'express';
import { IEmployer, IEmployersListApiResponseData } from 'types/employersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import {
  getShortNamesServiceTemplate,
  specialCharactersChecker,
} from './helpers/universalHelpers';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { db } from 'attorneys-db';
import { buildEmployersNameSearchConditions } from './helpers/employersHelpers';

export const getEmployersNamesService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IEmployer[] | undefined>> => {
  try {
    return await getShortNamesServiceTemplate('employers')(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};

export const getEmployersListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IEmployersListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'asc',
      sortBy = 'emp.created_at',
      size = 10,
      page = 1,
      name,
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCaseEmployersList = 'employersList'.toUpperCase();

    const totalCountQuery = db('employers as emp')
      .count('emp.id as total_employers')
      .leftJoin('people as p', 'emp.id', 'p.employer_id')
      .first();

    const employersQuery = db('employers as emp')
      .select('emp.name', db.raw('COUNT(p.id) as employees_count'))
      .leftJoin('people as p', 'emp.id', 'p.employer_id')
      .offset(offset)
      .limit(Number(size))
      .groupBy('emp.name', 'emp.created_at');

    switch (sortBy) {
      case 'name':
        employersQuery.orderBy('emp.name', sort as string);
        break;
      default:
        employersQuery.orderBy('emp.created_at', 'asc');
        break;
    }

    if (name) {
      const nameForSearch = name as string;
      const namesArr = specialCharactersChecker(nameForSearch);
      employersQuery.where(function () {
        for (const term of namesArr) {
          buildEmployersNameSearchConditions(this, term);
        }
      });
      totalCountQuery.where(function () {
        for (const term of namesArr) {
          buildEmployersNameSearchConditions(this, term);
        }
      });
    }

    const [totalCountResult, employers] = await Promise.all([
      totalCountQuery,
      employersQuery,
    ]);

    if (employers.length === 0 || !totalCountResult) {
      res.status(404);
      return mapApiToResponse(404, `${upperCaseEmployersList}.NOT_FOUND`);
    }

    const totalEmployers = Number(totalCountResult.total_employers);
    const totalPages = Math.ceil(Number(totalEmployers) / Number(size));

    const apiResponse: IEmployersListApiResponseData = {
      employers,
      meta: {
        sort: (sort as string) ?? 'asc',
        sortBy: (sortBy as string) ?? 'created_at',
        total_number: totalEmployers,
        total_pages: totalPages,
        page: page as number,
      },
    };

    res.status(200);

    return mapApiToResponse(
      200,
      `${upperCaseEmployersList}.SUCCESSFULY_RETRIEVED_NAMES`,
      apiResponse,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
