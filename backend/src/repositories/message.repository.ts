import { ResultSetHeader } from 'mysql2';
import { executeQuery } from '../db-connection';
import { CreateMessageRequest } from '../dtos/message.dto';

export const createMessage = async (
  createMessageRequest: CreateMessageRequest,
): Promise<number | undefined> => {
  const query =
    'INSERT INTO messages (sender_id, receiver_id, message, created_at) VALUES (?, ?, ?, ?);';
  const params = [
    createMessageRequest.senderId,
    createMessageRequest.receiverId,
    createMessageRequest.message,
    new Date().toISOString().slice(0, 19).replace('T', ' '),
  ];
  const results = await executeQuery<ResultSetHeader>(query, params);

  return results.insertId;
};
