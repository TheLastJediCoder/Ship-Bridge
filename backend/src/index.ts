import bodyParser from 'body-parser';
import express from 'express';
import { closePool } from './db-connection';
import { uesrRouter } from './controllers/user.controller';
import { loginRouter } from './controllers/login.controller';
import { messageRouter } from './controllers/message.controller';

const app = express();
const PORT = 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', loginRouter);
app.use('/users', uesrRouter);
app.use('/messages', messageRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
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
