'use strict';
import express from 'express';
import { userWithId, updateUserData } from '../controllers/userController.js';
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

router.route('/:id').get(userWithId).put(checkAuth, updateUserData);

export default router;
