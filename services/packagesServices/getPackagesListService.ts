import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { specialCharactersChecker } from '../helpers/universalHelpers';
import catchErrorStack from 'utils/catchErrorStack';
import { buildPackagesNameSearchConditions } from '../helpers/packagesHelpers';
import { IPackagesListApiResponseData } from 'types/packagesTypes';

export const getPackagesListService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<IPackagesListApiResponseData | undefined>> => {
  try {
    const {
      sort = 'desc',
      sortBy = 'pck.created_at',
      size = 25,
      page = 1,
      package_name,
    } = req.query;

    const offset = (Number(page) - 1) * Number(size);

    const upperCasePackagesList = 'packagesList'.toUpperCase();

    const totalCountQuery = db('packages as pck')
      .select(db.raw('COUNT(DISTINCT pck.id) as total_packages'))
      .leftJoin('cases as c', 'pck.id', 'c.package_id')
      .first();

    const packagesQuery = db('packages as pck')
      .select('pck.id', 'pck.package_name', db.raw('COUNT(c.id) as case_count'))
      .leftJoin('cases as c', 'pck.id', 'c.package_id')
      .offset(offset)
      .limit(Number(size))
      .groupBy('pck.id', 'pck.package_name', 'pck.created_at');

    switch (sortBy) {
      case 'package_name':
        packagesQuery.orderBy('pck.package_name', sort as string);
        break;
      case 'number_of_cases':
        packagesQuery.orderBy('case_count', sort as string);
        break;
      default:
        packagesQuery.orderBy('pck.created_at', 'desc');
        break;
    }

    if (package_name) {
      const nameForSearch = package_name as string;
      const namesArr = specialCharactersChecker(nameForSearch);
      packagesQuery.where(function () {
        for (const term of namesArr) {
          buildPackagesNameSearchConditions(this, term);
        }
      });
      totalCountQuery.where(function () {
        for (const term of namesArr) {
          buildPackagesNameSearchConditions(this, term);
        }
      });
    }

    const [totalCountResult, packages] = await Promise.all([
      totalCountQuery,
      packagesQuery,
    ]);

    if (packages.length === 0 || !totalCountResult) {
      res.status(404);
      return mapApiToResponse(404, `${upperCasePackagesList}.NOT_FOUND`);
    }

    const totalPackages = Number(totalCountResult.total_packages);
    const totalPages = Math.ceil(Number(totalPackages) / Number(size));

    const apiResponse: IPackagesListApiResponseData = {
      packages,
      meta: {
        sort: (sort as string) ?? 'asc',
        sortBy: (sortBy as string) ?? 'created_at',
        total_number: totalPackages,
        total_pages: totalPages,
        page: page as number,
      },
    };

    res.status(200);

    return mapApiToResponse(
      200,
      `${upperCasePackagesList}.SUCCESSFULY_RETRIEVED_NAMES`,
      apiResponse,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
