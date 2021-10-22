'use strict';
import * as service from '../services/activity.js';

const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.json(response);
  } catch (e) {
    next(e);
  }
};

export { getAll };