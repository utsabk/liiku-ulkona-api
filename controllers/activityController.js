'use strict';
import * as activityService from '../services/activity.js';
import * as activityTypesService from '../services/activityType.js';

const getAll = async (req, res, next) => {
  try {
    const response = await activityService.getAll();
    res.json(response);
  } catch (e) {
    next(e);
  }
};

const searchActivityWithCode = async (req, res, next) => {
  try {
    const typeCode = req.query.code;

    const search = await activityService.searchActivityWithCode(typeCode);

    if (search) {
      res.json(search);
    }
  } catch (err) {
    next(err);
  }
};

const searchActivityType = async (req, res, next) => {
  try {
    const query = req.query.name;

    const search = await activityTypesService.searchActivityType(query);

    if (search) {
      res.json(search);
    }
  } catch (err) {
    next(err);
  }
};

export { getAll, searchActivityType, searchActivityWithCode };
