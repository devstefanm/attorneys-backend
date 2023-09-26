import { db } from 'attorneys-db';
import { Request, Response } from 'express';
import { IClient } from 'types/clientsTypes';
import catchErrorStack from 'utils/catchErrorStack';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const deleteClientService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<number | undefined>> => {
  try {
    const { clientId } = req.params;

    // Fetch the existing client details
    const existingClient: IClient = await db('clients')
      .select('id')
      .where('id', clientId)
      .first();

    if (!existingClient) {
      res.status(404);
      return mapApiToResponse(404, 'errors.notFound', existingClient);
    }

    // Delete the client with the specified clientId
    await db('clients').where('id', clientId).del();

    res.status(200); // 200 instead of 204 No Content status for successful deletion because message was not showing
    return mapApiToResponse(200, 'messages.clientsDeleted', existingClient.id);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
