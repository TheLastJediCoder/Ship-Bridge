import { ResultSetHeader } from 'mysql2';
import { executeQuery } from '../db-connection';
import { CreateOrderRequest } from '../dtos/order.dto';
import { User } from '../models/user.model';

export const createOrdere = async (
  createOrderRequest: CreateOrderRequest,
  creator: User,
): Promise<number | undefined> => {
  const query =
    'INSERT INTO orders (creatorId, name, description) VALUES(?, ?, ?);';
  const params = [
    creator.id,
    createOrderRequest.name,
    createOrderRequest.description,
  ];
  const results = await executeQuery<ResultSetHeader>(query, params);

  return results.insertId;
};
