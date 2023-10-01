import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { ILawyerApiResponseData } from 'types/lawyersTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const getLawyerService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ILawyerApiResponseData | undefined>> => {
  try {
    const { lawyerId } = req.params;

    const lawyer: ILawyerApiResponseData = await db('lawyers as l')
      .select(
        'l.id',
        'l.office_name',
        'l.first_name',
        'l.last_name',
        'l.email',
        'l.address',
        db.raw(
          "CASE WHEN COUNT(ci.id) = 0 THEN null ELSE json_build_object('id', ci.id, 'name', ci.name) END as city",
        ),
        db.raw(
          'CASE WHEN COUNT(pn.number) = 0 THEN null ELSE json_agg(distinct pn.number) END as phone_numbers',
        ),
      )
      .where('l.id', lawyerId)
      .leftJoin('cities as ci', 'l.city_id', 'ci.id')
      .leftJoin('phone_numbers as pn', 'l.id', 'pn.lawyer_id')
      .groupBy(
        'l.id',
        'l.office_name',
        'l.first_name',
        'l.last_name',
        'l.email',
        'l.address',
        'ci.id',
      )
      .first();

    if (!lawyer) {
      res.status(404);
      return mapApiToResponse(404, `errors.notFound`);
    }

    res.status(200);
    return mapApiToResponse(200, `messages.retrieveLawyerSuccess`, lawyer);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
