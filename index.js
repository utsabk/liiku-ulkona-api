import 'dotenv/config';
import express from 'express';
import './db/connection.js';
import activityRoutes from './routes/activity.js';
import { writeActivities } from './services/activity.js';
import { writeActivityTypes } from './services/activityType.js';

const app = express();

app.use('/activity', activityRoutes);

app.get('/write-activities', writeActivities);
app.get('/write-activity-types', writeActivityTypes);

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
