'use strict';
import mongoose from 'mongoose';
import fetchResources from './fetch.js';
import ActivityType from '../models/ActivitiesTypes.js';

const URL = `${process.env.API_URL}sports-place-types?lang=en`;

const getActivityTypes = async () => {
  const types = await fetchResources(URL);
  return types;
};

const writeToDB = async () => {
  const types = await getActivityTypes();

  try {
    types.forEach(async (type) => {
      const myType = new ActivityType({
        ...type,
      });

      await myType.save();
      mongoose.set('debug', true);
    });
  } catch (err) {
    console.log('Error while saving activity-types', err);
  }
};

export { getActivityTypes, writeToDB };
