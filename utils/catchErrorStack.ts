import { Response } from 'express';
import mapApiToResponse from './mapApiToResponse';

const catchErrorStack = (res: Response, error: any | unknown) => {
  console.error(error);
  res.status(500);
  return mapApiToResponse(
    500,
    error.message || 'errors.serverError',
    undefined,
  );
};

export default catchErrorStack;
