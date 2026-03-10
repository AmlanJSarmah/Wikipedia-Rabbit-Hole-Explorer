import { Request, Response, NextFunction } from 'express';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userSignUpSchema, userSignInSchema } from '../schemas/user.schema.js';
import { User } from '../models/user.model.js';
import { AppError } from '../utils/error.js';
import { env } from '../config/env.js';

export const handleUserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let userDetails = userSignUpSchema.parse(req.body);
    const user = await User.findOne({ username: userDetails.username });
    if (user) throw new AppError(409, 'User already exists');
    userDetails.password = await hash(userDetails.password, env.SALT);
    await User.create(userDetails);
    return res.status(200).json({ message: 'user signed up' });
  } catch (err) {
    next(err);
  }
};

export const handleUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqBodyParsed = userSignInSchema.parse(req.body);
    const user = await User.findOne({ username: reqBodyParsed.username });
    if (user && (await compare(reqBodyParsed.password, user.password))) {
      const token = jwt.sign(
        {
          userName: reqBodyParsed.username,
        },
        env.JWT_SECRET,
        { expiresIn: '1hr' }
      );
      res
        .status(200)
        .json({ message: 'User Logged in Successful', token: token });
    } else throw new AppError(401, "User doesn't exist");
  } catch (err) {
    next(err);
  }
};
