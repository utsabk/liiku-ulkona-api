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

const searchActivityType = async (req, res, next) => {
  try {
    const query = req.query.name;

    const search = await service.searchActivityType(query);

    if (search) {
      res.json(search);
    }
  } catch (err) {
    next(err);
  }
};

export { getAll, searchActivityType };
