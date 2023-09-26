import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ICity } from 'types/citiesTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const deleteCityService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<number | undefined>> => {
  try {
    const { cityId } = req.params;

    // Fetch the existing city details
    const existingCity: ICity = await db('cities')
      .select('id')
      .where('id', cityId)
      .first();

    if (!existingCity) {
      res.status(404);
      return mapApiToResponse(404, 'errors.notFound', existingCity);
    }

    // Delete the city with the specified cityId
    await db('cities').where('id', cityId).del();

    res.status(200); // 200 instead of 204 No Content status for successful deletion because message was not showing
    return mapApiToResponse(200, 'messages.citiesDeleted', existingCity.id);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
