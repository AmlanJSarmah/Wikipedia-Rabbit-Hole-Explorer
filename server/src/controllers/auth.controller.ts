import { Request, Response, NextFunction } from 'express';

export const handleUserSignUp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    return res.status(200).json({ message: 'user signed up' });
  } catch (err) {
    next(err);
  }
};
