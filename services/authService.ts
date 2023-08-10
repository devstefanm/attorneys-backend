import { db } from 'attorneys-db';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import {
  loginSchema,
  registrationSchema,
} from 'middlewares/schemas/authSchemas';
import {
  ILoggedUser,
  ILoginApiResponseData,
  IRegistrationPassword,
} from 'types/authTypes';
import catchErrorStack from 'utils/catchErrorStack';
import jwtGenerator from 'utils/jwtGenerator';
import mapApiToResponse, { IApiResponse } from 'utils/mapApiToResponse';

export const loginService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<ILoginApiResponseData | undefined>> => {
  try {
    const { identifier, password } = req.body;
    const validator = loginSchema.validate(req.body);

    if (validator.error) {
      res.status(400);
      return mapApiToResponse(400, validator.error.message);
    }

    const user: ILoggedUser = await db('users as u')
      .select(
        'u.id',
        'u.username',
        'u.email',
        'u.password',
        'r.name as role_name',
      )
      .join('roles as r', 'u.role', 'r.id')
      .where('username', identifier)
      .orWhere('email', identifier)
      .first();

    if (!user) {
      res.status(401);
      return mapApiToResponse(401, 'LOGIN.IDENTIFIER_INCORRECT');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401);
      return mapApiToResponse(401, 'LOGIN.PASSWORD_INCORRECT');
    }

    const { id, email, username, role_name } = user;
    const tokens = jwtGenerator({ id, email, username, role_name });
    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });

    res.status(200);
    return mapApiToResponse(200, 'LOGIN.SUCCESS', tokens);
  } catch (error) {
    return catchErrorStack(res, error);
  }
};

export const registrationService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<undefined>> => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const validator = registrationSchema.validate(req.body);

    if (validator.error) {
      res.status(400);
      return mapApiToResponse(400, validator.error.message);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = db('users').select('password').where('id', id).first();

    let passwordUpdate: IRegistrationPassword = await query;

    if (!passwordUpdate.password) {
      res.status(400);
      return mapApiToResponse(400, 'REGISTRATION.USER_NOT_FOUND');
    }

    if (await bcrypt.compare(password, passwordUpdate.password)) {
      res.status(400);
      return mapApiToResponse(400, 'REGISTRATION.PASSWORD_SAME_AS_OLD');
    }
    passwordUpdate = await query.update({ password: hashedPassword });

    return mapApiToResponse(200, 'REGISTRATION.SUCCESS');
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
