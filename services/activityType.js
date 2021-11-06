'use strict';
import mongoose from 'mongoose';
import fetchResources from './fetch.js';
import ActivityType from '../models/ActivitiesTypes.js';

const URL = `${process.env.API_URL}sports-place-types?lang=en`;

const getActivityTypes = async () => {
  try {
    const types = await fetchResources(URL);
    return types;
  } catch (err) {
    throw new Error(`Error fetching activity types from API: ${err}`);
  }
};

const writeActivityTypes = async (req, res) => {
  const types = await getActivityTypes();

  console.log('activity types collection', types.length);

  ActivityType.collection.drop(); // Drop table before writing

  try {
    types.forEach(async (type) => {
      const myType = new ActivityType({
        ...type,
      });

      await myType.save((err, doc) => {
        if (err) return console.err(err);
        //  console.log('Document inserted succussfully!');
      });
    });
    res.send('Activity types inserted succussfully!');
  } catch (err) {
    console.log('Error while saving activity-types', err);
  }
};

const searchActivityType = async (text) => {
  try {
    let query = [
      //  { name: { $regex: new RegExp(text, 'i') } },
      { name: { $regex: new RegExp(text, 'i') } },
    ];

    console.log('query', query);

    // find (), first argument is the query filter (also known as conditions)
    // second argument is the query projection, which defines what fields to include or exclude from the query

    const results = await ActivityType.find(
      { $or: query },
      { typeCode: 1, name: 1 } // only return sportType property from the object
    );
    return [...new Map(results.map((obj) => [obj['name'], obj])).values()]; // get distinct sportType value from the array
  } catch (err) {
    throw new Error('Failed to search activities types from database', err);
  }
};

export { getActivityTypes, searchActivityType, writeActivityTypes };
