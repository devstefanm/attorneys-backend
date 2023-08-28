import { Request, Response } from 'express';
import { IClient, IClientsListApiResponseData } from 'types/clientsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import {
  getShortNamesServiceTemplate,
  specialCharactersChecker,
} from './helpers/universalHelpers';
import { db } from 'attorneys-db';
import { buildClientsNameSearchConditions } from './helpers/clientsHelpers';

export const getClientsNamesService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IClient[] | undefined>> => {
  try {
    return await getShortNamesServiceTemplate('clients')(req, res);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};

export const getClientsListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IClientsListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'asc',
      sortBy = 'cl.created_at',
      size = 10,
      page = 1,
      client,
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCaseClientsList = 'clientsList'.toUpperCase();

    const totalCountQuery = db('clients as cl')
      .select(db.raw('COUNT(DISTINCT cl.id) as total_clients'))
      .leftJoin('cases as c', 'cl.id', 'c.client_id')
      .first();

    const clientsQuery = db('clients as cl')
      .select('cl.name as client', db.raw('COUNT(c.id) as case_count'))
      .leftJoin('cases as c', 'cl.id', 'c.client_id')
      .offset(offset)
      .limit(Number(size))
      .groupBy('cl.name', 'cl.created_at');

    switch (sortBy) {
      case 'client':
        clientsQuery.orderBy('cl.name', sort as string);
        break;
      case 'number_of_cases':
        clientsQuery.orderBy('case_count', sort as string);
        break;
      default:
        clientsQuery.orderBy('cl.created_at', 'asc');
        break;
    }

    if (client) {
      const nameForSearch = client as string;
      const namesArr = specialCharactersChecker(nameForSearch);
      clientsQuery.where(function () {
        for (const term of namesArr) {
          buildClientsNameSearchConditions(this, term);
        }
      });
      totalCountQuery.where(function () {
        for (const term of namesArr) {
          buildClientsNameSearchConditions(this, term);
        }
      });
    }

    const [totalCountResult, clients] = await Promise.all([
      totalCountQuery,
      clientsQuery,
    ]);

    if (clients.length === 0 || !totalCountResult) {
      res.status(404);
      return mapApiToResponse(404, `${upperCaseClientsList}.NOT_FOUND`);
    }

    const totalClients = Number(totalCountResult.total_clients);
    const totalPages = Math.ceil(Number(totalClients) / Number(size));

    const apiResponse: IClientsListApiResponseData = {
      clients,
      meta: {
        sort: (sort as string) ?? 'asc',
        sortBy: (sortBy as string) ?? 'created_at',
        total_number: totalClients,
        total_pages: totalPages,
        page: page as number,
      },
    };

    res.status(200);

    return mapApiToResponse(
      200,
      `${upperCaseClientsList}.SUCCESSFULY_RETRIEVED_NAMES`,
      apiResponse,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
