import { Request, Response } from 'express';
import { ICity, ICitiesListApiResponseData } from 'types/citiesTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import {
  getShortNamesServiceTemplate,
  specialCharactersChecker,
} from './helpers/universalHelpers';
import { db } from 'attorneys-db';
import { buildCitiesNameSearchConditions } from './helpers/citiesHelpers';

export const getCitiesNamesService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICity[] | undefined>> => {
  try {
    return await getShortNamesServiceTemplate('cities')(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};

export const getCitiesListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICitiesListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'asc',
      sortBy = 'ci.created_at',
      size = 10,
      page = 1,
      city,
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCaseCitiesList = 'citiesList'.toUpperCase();

    const totalCountQuery = db('cities as ci')
      .select(db.raw('COUNT(DISTINCT ci.id) as total_cities'))
      .leftJoin('debtors as d', 'ci.id', 'd.city_id')
      .leftJoin('executors as e', 'ci.id', 'e.city_id')
      .leftJoin('lawyers as l', 'ci.id', 'l.city_id')
      .first();

    const citiesQuery = db('cities as ci')
      .select(
        'ci.name as city',
        db.raw('COUNT(DISTINCT d.id) as debtor_count'),
        db.raw('COUNT(DISTINCT e.id) as executor_count'),
        db.raw('COUNT(DISTINCT l.id) as lawyer_count'),
      )
      .leftJoin('debtors as d', 'ci.id', 'd.city_id')
      .leftJoin('executors as e', 'ci.id', 'e.city_id')
      .leftJoin('lawyers as l', 'ci.id', 'l.city_id')
      .offset(offset)
      .limit(Number(size))
      .groupBy('ci.name', 'ci.created_at');

    switch (sortBy) {
      case 'city':
        citiesQuery.orderBy('ci.name', sort as string);
        break;
      case 'number_of_debtors':
        citiesQuery.orderBy('debtor_count', sort as string);
        break;
      case 'number_of_executors':
        citiesQuery.orderBy('executor_count', sort as string);
        break;
      case 'number_of_lawyers':
        citiesQuery.orderBy('lawyer_count', sort as string);
        break;
      default:
        citiesQuery.orderBy('ci.created_at', 'asc');
        break;
    }

    if (city) {
      const nameForSearch = city as string;
      const namesArr = specialCharactersChecker(nameForSearch);
      citiesQuery.where(function () {
        for (const term of namesArr) {
          buildCitiesNameSearchConditions(this, term);
        }
      });
      totalCountQuery.where(function () {
        for (const term of namesArr) {
          buildCitiesNameSearchConditions(this, term);
        }
      });
    }

    const [totalCountResult, cities] = await Promise.all([
      totalCountQuery,
      citiesQuery,
    ]);

    if (cities.length === 0 || !totalCountResult) {
      res.status(404);
      return mapApiToResponse(404, `${upperCaseCitiesList}.NOT_FOUND`);
    }

    const totalCities = Number(totalCountResult.total_cities);
    const totalPages = Math.ceil(Number(totalCities) / Number(size));

    const apiResponse: ICitiesListApiResponseData = {
      cities,
      meta: {
        sort: (sort as string) ?? 'asc',
        sortBy: (sortBy as string) ?? 'created_at',
        total_number: totalCities,
        total_pages: totalPages,
        page: page as number,
      },
    };

    res.status(200);

    return mapApiToResponse(
      200,
      `${upperCaseCitiesList}.SUCCESSFULY_RETRIEVED_NAMES`,
      apiResponse,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
