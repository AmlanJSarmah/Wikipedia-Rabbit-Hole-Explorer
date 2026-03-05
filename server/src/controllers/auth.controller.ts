import { Request, Response, NextFunction } from 'express';
import { hash } from 'bcryptjs';
import { userPostSchema } from '../schemas/user.schema.js';
import { User } from '../models/user.model.js';
import { AppError } from '../utils/error.js';
import { env } from '../config/env.js';

export const handleUserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let userDetails = userPostSchema.parse(req.body);
    const user = await User.findOne({ username: userDetails.username });
    if (user) throw new AppError(409, 'User already exists');
    userDetails.password = await hash(userDetails.password, env.SALT);
    await User.create(userDetails);
    return res.status(200).json({ message: 'user signed up' });
  } catch (err) {
    next(err);
  }
};
