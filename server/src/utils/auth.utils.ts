import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authHeaderSchema, jwtVerifySchema } from '../schemas/user.schema.js';
import { env } from '../config/env.js';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = authHeaderSchema.parse(req.headers.authorization);
  const token = authHeaderSchema.parse(headers.split(' ')[1]);
  try {
    const decodedToken = jwt.verify(token, env.JWT_SECRET);
    const user = jwtVerifySchema.parse(decodedToken);
    req.authenticatedUser = {
      isAuthenticated: true,
      username: user.username,
    };
    next();
  } catch (err) {
    next(err);
  }
};
