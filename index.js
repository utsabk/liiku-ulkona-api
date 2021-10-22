import 'dotenv/config';
import express from 'express';
import db from './db/connection.js';

const app = express();

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
