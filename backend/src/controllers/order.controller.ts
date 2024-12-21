import express, { Request, Response } from 'express';
import { getUserByUsername } from '../repositories/user.repository';
import { authenticate } from '../middlewares/authentication.middleware';
import { CreateOrderRequest } from '../dtos/order.dto';
import { createOrdere } from '../repositories/oreder.repository';

export const orderRouter = express.Router();

orderRouter.use(authenticate);

const addOrder = async (req: Request, res: Response) => {
  const createMessageRequest = req.body as CreateOrderRequest;
  const userContext = req.userContext;
  const creator = await getUserByUsername(userContext.username);

  if (!creator) {
    res.status(404).json('Creator not found');
    return;
  }

  const orderId = await createOrdere(createMessageRequest, creator);

  res.send({ id: orderId });
  res.status(201);
};

orderRouter.post('/', addOrder);
