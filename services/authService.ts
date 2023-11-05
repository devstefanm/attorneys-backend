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
      return mapApiToResponse(401, 'errors.wrongEmailOrUsername');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401);
      return mapApiToResponse(401, 'errors.wrongPassword');
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

export const changePasswordService = async (
  req: Request,
  res: Response,
): Promise<IApiResponse<undefined>> => {
  try {
    const { userId } = req.params; // Change the parameter name from "id" to "userId"
    const { newPassword } = req.body; // Change the parameter name from "password" to "newPassword"

    // Check if the new password is at least 6 characters long
    if (newPassword.length < 6) {
      res.status(400);
      return mapApiToResponse(400, 'errors.newPasswordTooShort');
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;

    if (!passwordRegex.test(newPassword)) {
      res.status(400);
      return mapApiToResponse(400, 'errors.passwordComplexity');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Check if the user exists
    const user = await db('users')
      .select('password')
      .where('id', userId)
      .first();

    if (!user) {
      res.status(400);
      return mapApiToResponse(400, 'USER_NOT_FOUND');
    }

    // Compare the new password with the old password
    if (await bcrypt.compare(newPassword, user.password)) {
      res.status(400);
      return mapApiToResponse(400, 'errors.newPasswordSameAsOld');
    }

    // Update the user's password
    await db('users')
      .where('id', userId)
      .update({ password: hashedNewPassword });

    return mapApiToResponse(200, 'messages.passwordChanged');
  } catch (error) {
    return catchErrorStack(res, error);
  }
};
