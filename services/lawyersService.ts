import { Request, Response } from 'express';
import { ILawyer, ILawyersListApiResponseData } from 'types/lawyersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import {
  getFullNamesServiceTemplate,
  specialCharactersChecker,
} from './helpers/universalHelpers';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { db } from 'attorneys-db';
import {
  buildLawyersNameSearchConditions,
  buildLawyersOfficeNameSearchConditions,
} from './helpers/lawyersHelpers';

export const getLawyersNamesService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ILawyer[] | undefined>> => {
  try {
    return await getFullNamesServiceTemplate('lawyers')(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};

export const getLawyersListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ILawyersListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'asc',
      sortBy = 'l.created_at',
      size = 10,
      page = 1,
      office_name,
      name,
      email,
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCaseLawyersList = 'lawyersList'.toUpperCase();

    const totalCountQuery = db('lawyers as l')
      .count('l.id as total_lawyers')
      .leftJoin('cases as c', 'l.id', 'c.lawyer_id')
      .leftJoin('cities as ci', 'l.city_id', 'ci.id')
      .leftJoin('phone_numbers as pn', 'l.id', 'pn.lawyer_id')
      .first();

    const lawyersQuery = db('lawyers as l')
      .select(
        'l.first_name',
        'l.last_name',
        'l.office_name',
        'l.email',
        'l.address',
        'ci.name as city',
        'pn.number as phone_number',
        'pn.display_number as display_phone_number',
        db.raw('COUNT(c.id) as case_count'),
      )
      .leftJoin('cases as c', 'l.id', 'c.lawyer_id')
      .leftJoin('cities as ci', 'l.city_id', 'ci.id')
      .leftJoin('phone_numbers as pn', 'l.id', 'pn.lawyer_id')
      .offset(offset)
      .limit(Number(size))
      .groupBy(
        'l.first_name',
        'l.last_name',
        'l.office_name',
        'l.email',
        'l.address',
        'l.created_at',
        'ci.name',
        'pn.number',
        'pn.display_number',
      );

    switch (sortBy) {
      case 'name':
        lawyersQuery.orderBy('l.first_name', sort as string);
        break;
      case 'office_name':
        lawyersQuery.orderBy('l.office_name', sort as string);
        break;
      case 'email':
        lawyersQuery.orderBy('l.email', sort as string);
        break;
      case 'address':
        lawyersQuery.orderBy('l.address', sort as string);
        break;
      case 'city':
        lawyersQuery.orderBy('ci.name', sort as string);
        break;
      case 'display_phone_number':
        lawyersQuery.orderBy('pn.display_number', sort as string);
        break;
      case 'number_of_cases':
        lawyersQuery.orderBy('case_count', sort as string);
        break;
      default:
        lawyersQuery.orderBy('l.created_at', 'asc');
        break;
    }

    if (name) {
      const nameForSearch = name as string;
      const namesArr = specialCharactersChecker(nameForSearch);
      lawyersQuery.where(function () {
        for (const term of namesArr) {
          buildLawyersNameSearchConditions(this, term);
        }
      });
      totalCountQuery.where(function () {
        for (const term of namesArr) {
          buildLawyersNameSearchConditions(this, term);
        }
      });
    }

    if (office_name) {
      const officeName = office_name as string;
      const namesArr = specialCharactersChecker(officeName);
      lawyersQuery.where(function () {
        for (const term of namesArr) {
          buildLawyersOfficeNameSearchConditions(this, term);
        }
      });
      totalCountQuery.where(function () {
        for (const term of namesArr) {
          buildLawyersOfficeNameSearchConditions(this, term);
        }
      });
    }

    if (email) {
      const emailAddress = email as string;
      lawyersQuery.where(function () {
        this.whereRaw('LOWER(l.email) LIKE ?', [
          `%${emailAddress.toLowerCase()}%`,
        ]);
      });
      totalCountQuery.where(function () {
        this.whereRaw('LOWER(l.email) LIKE ?', [
          `%${emailAddress.toLowerCase()}%`,
        ]);
      });
    }

    const [totalCountResult, lawyers] = await Promise.all([
      totalCountQuery,
      lawyersQuery,
    ]);

    if (lawyers.length === 0 || !totalCountResult) {
      res.status(404);
      return mapApiToResponse(404, `${upperCaseLawyersList}.NOT_FOUND`);
    }

    const totalLawyers = Number(totalCountResult.total_lawyers);
    const totalPages = Math.ceil(Number(totalLawyers) / Number(size));

    const apiResponse: ILawyersListApiResponseData = {
      lawyers,
      meta: {
        sort: (sort as string) ?? 'asc',
        sortBy: (sortBy as string) ?? 'created_at',
        total_number: totalLawyers,
        total_pages: totalPages,
        page: page as number,
      },
    };

    res.status(200);

    return mapApiToResponse(
      200,
      `${upperCaseLawyersList}.SUCCESSFULY_RETRIEVED_NAMES`,
      apiResponse,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
