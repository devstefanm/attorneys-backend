import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IJwtPayload } from 'types/authTypes';

interface CustomRequest extends Request {
  payload?: IJwtPayload;
}

export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.headers['authorization'];

  if (!accessToken) {
    return res.status(401).json({ message: 'errors.noAccessToken' });
  }

  const token = accessToken.split(' ')[1]; // Remove the 'Bearer ' prefix

  if (!token) {
    return res.status(401).json({ message: 'errors.invalidAccessToken' });
  }

  if (!process.env.ACCESS_TOKEN_SECRET) {
    return res.status(500).json({ message: 'errors.accessTokenNotConfigured' });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'errors.invalidAccessToken' });
      }

      // If the token is valid, you can access the decoded payload
      const payload = decoded as IJwtPayload;

      // You can also attach the payload to the request object for further processing
      req.payload = payload;

      // Proceed to the next middleware or route handler
      next();
    },
  );
};
