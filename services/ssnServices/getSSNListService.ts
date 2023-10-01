import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { generateBigIntSearchQuery } from '../helpers/universalHelpers';
import catchErrorStack from 'utils/catchErrorStack';
import { ISSNListApiResponseData } from 'types/ssnNumbersTypes';

export const getSSNListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ISSNListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'desc',
      sortBy = 'ssn.created_at',
      size = 25,
      page = 1,
      ssn,
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCaseSSNList = 'ssnList'.toUpperCase();

    const totalCountQuery = db('ssn_numbers as ssn')
      .select(db.raw('COUNT(DISTINCT ssn.id) as total_ssn'))
      .leftJoin('cases as c', 'ssn.id', 'c.ssn_number_id')
      .first();

    const ssnNumbersQuery = db('ssn_numbers as ssn')
      .select('ssn.id', 'ssn.ssn', db.raw('COUNT(c.id) as case_count'))
      .leftJoin('cases as c', 'ssn.id', 'c.ssn_number_id')
      .offset(offset)
      .limit(Number(size))
      .groupBy('ssn.id', 'ssn.ssn', 'ssn.created_at');

    switch (sortBy) {
      case 'ssn':
        ssnNumbersQuery.orderBy('ssn.ssn', sort as string);
        break;
      case 'number_of_cases':
        ssnNumbersQuery.orderBy('case_count', sort as string);
        break;
      default:
        ssnNumbersQuery.orderBy('ssn.created_at', 'desc');
        break;
    }

    if (ssn) {
      const ssnNumber = ssn as string;
      generateBigIntSearchQuery(ssnNumbersQuery, ssnNumber, 'ssn.ssn');
      generateBigIntSearchQuery(totalCountQuery, ssnNumber, 'ssn.ssn');
    }

    const [totalCountResult, ssnNumbers] = await Promise.all([
      totalCountQuery,
      ssnNumbersQuery,
    ]);

    if (ssnNumbers.length === 0 || !totalCountResult) {
      res.status(404);
      return mapApiToResponse(404, `${upperCaseSSNList}.NOT_FOUND`);
    }

    const totalSSN = Number(totalCountResult.total_ssn);
    const totalPages = Math.ceil(Number(totalSSN) / Number(size));

    const apiResponse: ISSNListApiResponseData = {
      ssn_numbers: ssnNumbers,
      meta: {
        sort: (sort as string) ?? 'asc',
        sortBy: (sortBy as string) ?? 'created_at',
        total_number: totalSSN,
        total_pages: totalPages,
        page: page as number,
      },
    };

    res.status(200);

    return mapApiToResponse(
      200,
      `${upperCaseSSNList}.SUCCESSFULY_RETRIEVED_NAMES`,
      apiResponse,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
