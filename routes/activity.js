'use strict';
import express from 'express';
const router = express.Router();

import {
  searchActivities,
  searchActivityType,
} from '../controllers/activityController.js';

router.get('/', searchActivities);

router.get('/types', searchActivityType);

export default router;
