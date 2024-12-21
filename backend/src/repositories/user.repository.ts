import { ResultSetHeader } from 'mysql2';
import { executeQuery } from '../db-connection';
import { CreateUserRequest } from '../dtos/user.dto';
import { User } from '../models/user.model';

export const getUserByUsername = async (
  username: string,
): Promise<User | undefined> => {
  const query = 'SELECT * FROM users WHERE username = ?;';
  const params = [username];
  const results = await executeQuery<User[]>(query, params);

  if (results.length > 0) {
    return results[0];
  }
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  const query = 'SELECT * FROM users WHERE id = ?;';
  const params = [id];
  const results = await executeQuery<User[]>(query, params);

  if (results.length > 0) {
    return results[0];
  }
};

export const createUser = async (
  createUserRequest: CreateUserRequest,
  hashedPassword: string,
): Promise<number | undefined> => {
  const query =
    'INSERT INTO users (username, email, passwordHash) VALUES (?, ?, ?);';
  const params = [
    createUserRequest.username,
    createUserRequest.email,
    hashedPassword,
  ];
  const results = await executeQuery<ResultSetHeader>(query, params);

  return results.insertId;
};
