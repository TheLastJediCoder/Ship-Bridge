import bodyParser from 'body-parser';
import express from 'express';
// import mysql from 'mysql';

import mysql from 'mysql2';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'shipbridge',
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users', (req, res) => {
  connection.connect();

  connection.query(
    'INSERT INTO users (username, email) VALUES ("test", "test")',
    (err) => {
      if (err) throw err;
    },
  );
  res.send(req.body);
  res.status(201);
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

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
