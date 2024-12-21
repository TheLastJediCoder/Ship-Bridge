import express, { Request, Response } from 'express';
import { getUserByUsername } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const loginRouter = express.Router();

const login = async (req: Request, res: Response) => {
  const requestBody = req.body;
  const user = await getUserByUsername(requestBody.username);

  if (!user) {
    res.status(401);
    res.send({ error: 'Invalid credentials' });
    return;
  }

  const isPasswordValid = await bcrypt.compare(
    requestBody.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    res.status(401);
    res.send({ error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign(
    { username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: 60 * 60 * 6 },
  );

  res.status(200);
  res.send({ token: token });
};

loginRouter.post('/login', login);
