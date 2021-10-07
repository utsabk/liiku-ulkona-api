import 'dotenv/config';
import express from 'express';
import db from './db/database.js';
import User from './models/user.js';

const app = express();

app.get('/test', async (req, res) => {
  const newUser = await User.create({
    name: 'test',
    email: 'test@example.com',
  });

  console.log('new user', newUser);
});

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
