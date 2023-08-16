import { Request, Response } from 'express';
import { IExecutor, IExecutorsListApiResponseData } from 'types/executorsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import {
  getFullNamesServiceTemplate,
  specialCharactersChecker,
} from './helpers/universalHelpers';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { db } from 'attorneys-db';
import { buildExecutorsNameSearchConditions } from './helpers/executorsHelpers';

export const getExecutorsNamesService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IExecutor[] | undefined>> => {
  try {
    return await getFullNamesServiceTemplate('executors')(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};

export const getExecutorsListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IExecutorsListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'asc',
      sortBy = 'e.created_at',
      size = 10,
      page = 1,
      name,
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCaseExecutorsList = 'executorsList'.toUpperCase();

    const totalCountQuery = db('executors as e')
      .count('e.id as total_executors')
      .leftJoin('case_executors as ce', 'e.id', 'ce.executor_id')
      .leftJoin('cities as ci', 'e.city_id', 'ci.id')
      .leftJoin('phone_numbers as pn', 'e.id', 'pn.lawyer_id')
      .first();

    const executorsQuery = db('executors as e')
      .select(
        'e.first_name',
        'e.last_name',
        'ci.name as city',
        'pn.number as phone_number',
        'pn.display_number as display_phone_number',
        db.raw('COUNT(ce.case_id) as case_count'),
      )
      .leftJoin('case_executors as ce', 'e.id', 'ce.executor_id')
      .leftJoin('cities as ci', 'e.city_id', 'ci.id')
      .leftJoin('phone_numbers as pn', 'e.id', 'pn.lawyer_id')
      .offset(offset)
      .limit(Number(size))
      .groupBy(
        'e.first_name',
        'e.last_name',
        'e.address',
        'e.created_at',
        'ci.name',
        'pn.number',
        'pn.display_number',
      );

    switch (sortBy) {
      case 'name':
        executorsQuery.orderBy('e.first_name', sort as string);
        break;
      case 'display_phone_number':
        executorsQuery.orderBy('pn.display_number', sort as string);
        break;
      case 'city':
        executorsQuery.orderBy('ci.name', sort as string);
        break;
      case 'number_of_cases':
        executorsQuery.orderBy('case_count', sort as string);
        break;
      default:
        executorsQuery.orderBy('e.created_at', 'asc');
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
