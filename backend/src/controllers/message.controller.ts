import express, { Request, Response } from 'express';
import { CreateMessageRequest } from '../dtos/message.dto';
import { getUserById } from '../repositories/user.repository';
import { createMessage } from '../repositories/message.repository';
import { authenticate } from '../middlewares/authentication.middleware';

export const messageRouter = express.Router();

messageRouter.use(authenticate);

const addMessage = async (req: Request, res: Response) => {
  console.log(req.userContext);
  const createMessageRequest = req.body as CreateMessageRequest;

  if (createMessageRequest.senderId === createMessageRequest.receiverId) {
    res.status(400).json('Message sender and receiver cannot be same');
    return;
  }

  const sender = await getUserById(createMessageRequest.senderId);

  if (!sender) {
    res.status(400).json('Invalid message sender');
    return;
  }

  const receiver = await getUserById(createMessageRequest.receiverId);

  if (!receiver) {
    res.status(400).json('Invalid message receiver');
    return;
  }

  const messageId = await createMessage(createMessageRequest);

  res.send({ id: messageId });
  res.status(201);
};

messageRouter.post('/', addMessage);
