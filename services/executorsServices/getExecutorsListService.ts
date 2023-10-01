import { Request, Response } from 'express';
import { IExecutorsListApiResponseData } from 'types/executorsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import { specialCharactersChecker } from '../helpers/universalHelpers';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { db } from 'attorneys-db';
import { buildExecutorsNameSearchConditions } from '../helpers/executorsHelpers';

export const getExecutorsListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IExecutorsListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'desc',
      sortBy = 'e.created_at',
      size = 25,
      page = 1,
      name,
      email,
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCaseExecutorsList = 'executorsList'.toUpperCase();

    const totalCountQuery = db('executors as e')
      .select(db.raw('COUNT(DISTINCT e.id) as total_executors'))
      .leftJoin('case_executors as ce', 'e.id', 'ce.executor_id')
      .leftJoin('cities as ci', 'e.city_id', 'ci.id')
      .leftJoin('phone_numbers as pn', 'e.id', 'pn.lawyer_id')
      .first();

    const executorsQuery = db('executors as e')
      .select(
        'e.id',
        'e.first_name',
        'e.last_name',
        'e.email',
        'ci.name as city',
        db.raw("string_agg(distinct pn.number, ', ') as phone_numbers"),
        db.raw(
          "string_agg(distinct pn.display_number, ', ') as display_phone_numbers",
        ),
        db.raw('COUNT(ce.case_id) as case_count'),
      )
      .leftJoin('case_executors as ce', 'e.id', 'ce.executor_id')
      .leftJoin('cities as ci', 'e.city_id', 'ci.id')
      .leftJoin('phone_numbers as pn', 'e.id', 'pn.executor_id')
      .offset(offset)
      .limit(Number(size))
      .groupBy(
        'e.id',
        'e.first_name',
        'e.last_name',
        'e.email',
        'e.address',
        'e.created_at',
        'ci.name',
      );

    switch (sortBy) {
      case 'name':
        executorsQuery.orderBy('e.first_name', sort as string);
        break;
      case 'email':
        executorsQuery.orderBy('e.email', sort as string);
        break;
      case 'display_phone_numbers':
        executorsQuery.orderBy('phone_numbers', sort as string);
        break;
      case 'city':
        executorsQuery.orderBy('ci.name', sort as string);
        break;
      case 'number_of_cases':
        executorsQuery.orderBy('case_count', sort as string);
        break;
      default:
        executorsQuery.orderBy('e.created_at', 'desc');
        break;
    }

    if (name) {
      const nameForSearch = name as string;
      const namesArr = specialCharactersChecker(nameForSearch);
      executorsQuery.where(function () {
        for (const term of namesArr) {
          buildExecutorsNameSearchConditions(this, term);
        }
      });
      totalCountQuery.where(function () {
        for (const term of namesArr) {
          buildExecutorsNameSearchConditions(this, term);
        }
      });
    }

    if (email) {
      const emailAddress = email as string;
      executorsQuery.where(function () {
        this.whereRaw('LOWER(e.email) LIKE ?', [
          `%${emailAddress.toLowerCase()}%`,
        ]);
      });
      totalCountQuery.where(function () {
        this.whereRaw('LOWER(e.email) LIKE ?', [
          `%${emailAddress.toLowerCase()}%`,
        ]);
      });
    }

    const [totalCountResult, executors] = await Promise.all([
      totalCountQuery,
      executorsQuery,
    ]);

    if (executors.length === 0 || !totalCountResult) {
      res.status(404);
      return mapApiToResponse(404, `${upperCaseExecutorsList}.NOT_FOUND`);
    }

    const totalExecutors = Number(totalCountResult.total_executors);
    const totalPages = Math.ceil(Number(totalExecutors) / Number(size));

    const apiResponse: IExecutorsListApiResponseData = {
      executors,
      meta: {
        sort: (sort as string) ?? 'asc',
        sortBy: (sortBy as string) ?? 'created_at',
        total_number: totalExecutors,
        total_pages: totalPages,
        page: page as number,
      },
    };

    res.status(200);

    return mapApiToResponse(
      200,
      `${upperCaseExecutorsList}.SUCCESSFULY_RETRIEVED_NAMES`,
      apiResponse,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
