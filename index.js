import 'dotenv/config';
import express from 'express';
import './db/connection.js';

import activityRoutes from './routes/activity.js';

const app = express();

app.use('/activity', activityRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
