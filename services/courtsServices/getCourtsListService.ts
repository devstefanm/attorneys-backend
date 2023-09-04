import { Request, Response } from 'express';
import { ICourtsListApiResponseData } from 'types/courtsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { specialCharactersChecker } from '../helpers/universalHelpers';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { db } from 'attorneys-db';
import { buildCourtsNameSearchConditions } from '../helpers/courtsHelpers';

export const getCourtsListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICourtsListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'asc',
      sortBy = 'co.created_at',
      size = 10,
      page = 1,
      court,
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCaseCourtsList = 'courtsList'.toUpperCase();

    const totalCountQuery = db('courts as co')
      .select(db.raw('COUNT(DISTINCT co.id) as total_courts'))
      .leftJoin('cases as c', 'co.id', 'c.court_id')
      .first();

    const courtsQuery = db('courts as co')
      .select('co.name as court', db.raw('COUNT(c.id) as case_count'))
      .leftJoin('cases as c', 'co.id', 'c.court_id')
      .offset(offset)
      .limit(Number(size))
      .groupBy('co.name', 'co.created_at');

    switch (sortBy) {
      case 'court':
        courtsQuery.orderBy('co.name', sort as string);
        break;
      case 'number_of_cases':
        courtsQuery.orderBy('case_count', sort as string);
        break;
      default:
        courtsQuery.orderBy('co.created_at', 'asc');
        break;
    }

    if (court) {
      const nameForSearch = court as string;
      const namesArr = specialCharactersChecker(nameForSearch);
      courtsQuery.where(function () {
        for (const term of namesArr) {
          buildCourtsNameSearchConditions(this, term);
        }
      });
      totalCountQuery.where(function () {
        for (const term of namesArr) {
          buildCourtsNameSearchConditions(this, term);
        }
      });
    }

    const [totalCountResult, courts] = await Promise.all([
      totalCountQuery,
      courtsQuery,
    ]);

    if (courts.length === 0 || !totalCountResult) {
      res.status(404);
      return mapApiToResponse(404, `${upperCaseCourtsList}.NOT_FOUND`);
    }

    const totalCourts = Number(totalCountResult.total_courts);
    const totalPages = Math.ceil(Number(totalCourts) / Number(size));

    const apiResponse: ICourtsListApiResponseData = {
      courts,
      meta: {
        sort: (sort as string) ?? 'asc',
        sortBy: (sortBy as string) ?? 'created_at',
        total_number: totalCourts,
        total_pages: totalPages,
        page: page as number,
      },
    };

    res.status(200);

    return mapApiToResponse(
      200,
      `${upperCaseCourtsList}.SUCCESSFULY_RETRIEVED_NAMES`,
      apiResponse,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
