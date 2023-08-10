import jwt from 'jsonwebtoken';
import { IJwtPayload, ILoginApiResponseData } from 'types/authTypes';

const jwtGenerator = (jwtPayload: IJwtPayload): ILoginApiResponseData => {
  let accessToken = '';
  let refreshToken = '';

  if (process.env.ACCESS_TOKEN_SECRET) {
    accessToken = jwt.sign(
      jwtPayload,
      process?.env?.ACCESS_TOKEN_SECRET?.toString(),
      { expiresIn: '60m' },
    );
  }

  if (process.env.REFRESH_TOKEN_SECRET) {
    refreshToken = jwt.sign(
      jwtPayload,
      process?.env?.REFRESH_TOKEN_SECRET?.toString(),
      { expiresIn: '120m' },
    );
  }

  return { accessToken, refreshToken };
};

export default jwtGenerator;
