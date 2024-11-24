import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserContext } from '../types/express';

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authorization token is required' });
    return;
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET) as UserContext;

    req.userContext = payload;
  } catch {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }

  next();
};
