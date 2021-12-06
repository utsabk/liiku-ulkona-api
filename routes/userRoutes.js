'use strict';
import express from 'express';
import {
  userWithId,
  updateUserData,
  getAllUsers,
} from '../controllers/userController.js';
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

router.get('/', getAllUsers);
router.route('/:id').get(userWithId).put(checkAuth, updateUserData);
export default router;
