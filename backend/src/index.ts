import bodyParser from 'body-parser';
import express from 'express';
import bcrypt from 'bcrypt';
import { closePool, executeQuery } from './db-connection';
import jwt from 'jsonwebtoken';
import { User } from './models/user.model';

const app = express();
const PORT = 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const getUserByUsername = async (
  username: string,
): Promise<User | undefined> => {
  const query = 'SELECT * FROM users WHERE username = ?;';
  const params = [username];
  const results = await executeQuery<User[]>(query, params);

  if (results.length > 0) {
    return results[0];
  }
};

app.post('/users', async (req, res) => {
  const requestBody = req.body;
  const salt = await bcrypt.genSalt(12);
  const existingUser = await getUserByUsername(requestBody.username);

  if (existingUser) {
    res.status(400).json('Please pick different username');
    return;
  }

  const hashedPassword = await bcrypt.hash(requestBody.password, salt);
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?);`;
  const params = [requestBody.username, requestBody.email, hashedPassword];

  await executeQuery(query, params);

  res.send(req.body);
  res.status(201);
});

app.post('/login', async (req, res) => {
  const requestBody = req.body;
  const user = await getUserByUsername(requestBody.username);

  if (!user) {
    res.status(401);
    res.send({ error: 'Invalid credentials' });
    return;
  }

  const isPasswordValid = await bcrypt.compare(
    requestBody.password,
    user.password,
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
