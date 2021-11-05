import 'dotenv/config';
import express from 'express';
import './db/connection.js';
import activityRoutes from './routes/activity.js';

const app = express();

app.use('/activity', activityRoutes);

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
