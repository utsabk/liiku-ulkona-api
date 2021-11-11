'use strict';
import express from 'express';
const router = express.Router();

import * as controller from '../controllers/activityController.js';

router.get('/', controller.getAll);

export default router;
