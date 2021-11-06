'use strict';
import mongoose from 'mongoose';
import fetchResources from './fetch.js';
import { sportPlacesFields, typeCodes, cityCodes } from './constants.js';
import Activity from '../models/Activity.js';

const fieldsString = sportPlacesFields
  .map((field) => `fields=${field}`)
  .join('&');

const typeCodesString = typeCodes
  .map((typeCode) => `typeCodes=${typeCode}`)
  .join('&');

const cityCodeString = `cityCodes=${cityCodes.Helsinki}`;

const limitPerPage = 100;

const fetchActivities = async (pageNo = 1) => {
  const URL = `${process.env.API_URL}sports-places?lang=en&page=${pageNo}&pageSize=${limitPerPage}&${fieldsString}&${cityCodeString}`;
  const activities = await fetchResources(URL);
  return activities;
};

const getEntireActivityList = async (pageNo = 1) => {
  try {
    console.log('Retreiving data from API for page : ', pageNo);

    const results = await fetchActivities(pageNo);

    if (results.length > 0) {
      return results.concat(await getEntireActivityList(pageNo + 1));
    }
    console.log('Data fetch complete');
    return results;
  } catch (err) {
    throw new Error('Error fetching data from external API', err);
  }
};

const writeActivities = async (req, res) => {
  const activities = await getEntireActivityList();

  console.log('activity collection', activities.length);

  Activity.collection.drop(); // Drop table before writing

  try {
    activities.forEach(async (activity) => {
      const myActivity = new Activity({
        ...activity,
        coordinates: activity.location.coordinates.wgs84,
      });
      await myActivity.save((err, doc) => {
        if (err) return console.err(err);
      //  console.log('Document inserted succussfully!');
      });
    });

    res.send('Activities inserted succussfully!');
  } catch (err) {
    throw new Error('Error while saving to activities', err);
  }
};

const getAll = async () => {
  try {
    return await Activity.find();
  } catch (err) {
    throw new Error('Failed to get data from database', err);
  }
};

export { writeActivities, getAll, fetchActivities, getEntireActivityList };
