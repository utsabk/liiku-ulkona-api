import 'dotenv/config';
import express from 'express';
import passport from 'passport'
import './db/connection.js';
import activityRoutes from './routes/activity.js';
import authRoutes from './routes/authRoutes.js';

import { writeActivities } from './services/activity.js';
import { writeActivityTypes } from './services/activityType.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use('/activity', activityRoutes);
app.use('/auth', authRoutes);

app.get('/write-activities', writeActivities);
app.get('/write-activity-types', writeActivityTypes);

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
