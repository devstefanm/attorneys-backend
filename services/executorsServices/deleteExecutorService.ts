import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { IExecutor } from 'types/executorsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const deleteExecutorService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<number | undefined>> => {
  try {
    const { executorId } = req.params;

    // Fetch the existing executor details
    const existingExecutor: IExecutor = await db('executors')
      .select('id')
      .where('id', executorId)
      .first();

    if (!existingExecutor) {
      res.status(404);
      return mapApiToResponse(404, 'errors.notFound', existingExecutor);
    }

    // Delete the executor with the specified executorId
    await db('executors').where('id', executorId).del();

    res.status(200); // 200 instead of 204 No Content status for successful deletion because message was not showing
    return mapApiToResponse(
      200,
      'messages.executorDeleted',
      existingExecutor.id,
    );
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
