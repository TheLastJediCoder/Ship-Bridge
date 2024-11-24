import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { createUser, getUserByUsername } from '../repositories/user.repository';
import { CreateUserRequest } from '../dtos/user.dto';

export const uesrRouter = express.Router();

const addUser = async (req: Request, res: Response) => {
  const createUserRequest = req.body as CreateUserRequest;
  const salt = await bcrypt.genSalt(12);
  const existingUser = await getUserByUsername(createUserRequest.username);

  if (existingUser) {
    res.status(400).json('Please pick different username');
    return;
  }

  const hashedPassword = await bcrypt.hash(createUserRequest.password, salt);

  const userId = await createUser(createUserRequest, hashedPassword);

  res.send({ username: createUserRequest.username, id: userId });
  res.status(201);
};

uesrRouter.post('/', addUser);
