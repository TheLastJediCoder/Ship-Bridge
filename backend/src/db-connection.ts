import mysql from 'mysql2/promise';
import "dotenv/config";

const dbConfig: mysql.ConnectionOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const pool = mysql.createPool(dbConfig);

export const getConnection = async (): Promise<mysql.PoolConnection> => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    return connection;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Database connection failed: ${errorMessage}`);
  }
};

export const closePool = async (): Promise<void> => {
  try {
    await pool.end();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Error closing pool: ${errorMessage}`);
  }
};

export const executeQuery = async <T>(
  query: string,
  params?: (string | number)[],
): Promise<T> => {
  const connection = await getConnection();
  try {
    const [results] = await connection.execute(query, params);
    return results as T;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Query execution failed: ${errorMessage}`);
  } finally {
    connection.release();
  }
};
