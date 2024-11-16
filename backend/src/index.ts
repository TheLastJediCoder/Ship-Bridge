import bodyParser from 'body-parser';
import express from 'express';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2/promise';
import { closePool, executeQuery } from './db-connection';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', async (req, res) => {
  const user = req.body;
  const salt = await bcrypt.genSalt(12);
  user.password = await bcrypt.hash(user.password, salt);

  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`;
  const params = [user.username, user.email, user.password];

  await executeQuery(query, params);

  res.send(req.body);
  res.status(201);
});

interface User extends RowDataPacket {
  id: number;
  username: string;
  email: string;
  password: string;
}

app.post('/login', async (req, res) => {
  const requestBody = req.body;
  const query = 'SELECT * FROM users WHERE username = ?;';
  const params = [requestBody.username];
  const results = await executeQuery<User[]>(query, params);
  const user = results[0];

  const isPasswordValid = await bcrypt.compare(
    requestBody.password,
    user.password,
  );

  if (!isPasswordValid) {
    res.status(401);
    res.send({ error: 'Please verify username and password' });
    return;
  }

  const token = jwt.sign(
    { username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: 60 * 60 * 6 },
  );

  res.status(200);
  res.send({ token: token });
});

app.get('/users/:userId', (req, res) => {
  const users = [
    {
      id: 1,
      name: 'test1',
    },
    {
      id: 2,
      name: 'test2',
    },
  ];
  const userId = req.params['userId'];
  res.send(users[parseInt(userId)]);
  res.status(200);
});

process.on('SIGTERM', async () => {
  await closePool();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await closePool();
  process.exit(0);
});

app.listen(PORT, async () => {
  console.log(`Backend running on port ${PORT}`);
});
