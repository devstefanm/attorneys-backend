import { Request, Response } from 'express';
import { IEmployersListApiResponseData } from 'types/employersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { specialCharactersChecker } from '../helpers/universalHelpers';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { db } from 'attorneys-db';
import { buildEmployersNameSearchConditions } from '../helpers/employersHelpers';

export const getEmployersListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IEmployersListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'desc',
      sortBy = 'emp.created_at',
      size = 25,
      page = 1,
      employer,
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCaseEmployersList = 'employersList'.toUpperCase();

    const totalCountQuery = db('employers as emp')
      .select(db.raw('COUNT(DISTINCT emp.id) as total_employers'))
      .leftJoin('people as p', 'emp.id', 'p.employer_id')
      .first();

    const employersQuery = db('employers as emp')
      .select(
        'emp.id',
        'emp.name as employer',
        db.raw('COUNT(p.id) as employees_count'),
      )
      .leftJoin('people as p', 'emp.id', 'p.employer_id')
      .offset(offset)
      .limit(Number(size))
      .groupBy('emp.id', 'emp.name', 'emp.created_at');

    switch (sortBy) {
      case 'employer':
        employersQuery.orderBy('emp.name', sort as string);
        break;
      case 'number_of_employees':
        employersQuery.orderBy('employees_count', sort as string);
        break;
      default:
        employersQuery.orderBy('emp.created_at', 'desc');
        break;
    }

    if (employer) {
      const nameForSearch = employer as string;
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
