import { Request, Response } from 'express';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';
import { ICreateEntityApiResponseData } from 'types/universalTypes';
import { db } from 'attorneys-db';

export const createPackageService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ICreateEntityApiResponseData | undefined>> => {
  try {
    const { package_name } = req.body;

    let newPackageId = null;

    if (package_name) {
      newPackageId = (
        await db('packages')
          .insert({
            package_name,
          })
          .returning('id')
      )[0].id;
    } else {
      res.status(400);
      return mapApiToResponse(400, `message.no_package_name`);
    }

    let apiResponse: ICreateEntityApiResponseData | undefined = undefined;

    if (newPackageId) {
      apiResponse = {
        id: newPackageId,
      };

      res.status(200);
      return mapApiToResponse(
        200,
        `message.package_successfully_created`,
        apiResponse,
      );
    }

    res.status(404);
    return mapApiToResponse(404, `message.package_not_found`, apiResponse);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
