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

export { getAll, searchActivityType };
