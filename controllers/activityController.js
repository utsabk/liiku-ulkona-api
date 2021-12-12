'use strict';
import * as activityService from '../services/activity.js';
import * as activityTypesService from '../services/activityType.js';

const searchActivities = async (req, res, next) => {
  try {
    if (req.query.code) {
      const typeCode = req.query.code;

      const search = await activityService.searchActivityWithCode(typeCode);

      if (search) {
        return res.json(search);
      }
    }
    const response = await activityService.getAll();
    return res.json(response);
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

export { searchActivityType, searchActivities };
