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
  console.log('Retreiving data from API for page : ', pageNo);

  const results = await fetchActivities(pageNo);

  if (results.length > 0) {
    return results.concat(await getEntireActivityList(pageNo + 1));
  }
  return results;
};

const writeToDB = async (req, res) => {
  const activities = await getEntireActivityList();

  try {
    activities.forEach(async (activity) => {
      const myActivity = new Activity({
        ...(activity.name && { name: activity.name }),
        sportType: activity.type.name,
        coordinates: activity.location.coordinates.wgs84,
        ...(activity.properties.infoFi && {
          infoFi: activity.properties.infoFi,
        }),

        contact: {
          ...(activity.email && {
            email: activity.email,
          }),
          ...(activity.phoneNumber && {
            phone: activity.phoneNumber,
          }),
          ...(activity.www && {
            webAddress: activity.www,
          }),
        },
        address: {
          ...(activity.location.address && {
            address: activity.location.address,
          }),
          ...(activity.location.postalCode && {
            postalCode: activity.location.postalCode,
          }),
          ...(activity.location.postalOffice && {
            postalOffice: activity.location.postalOffice,
          }),
          ...(activity.location.city.name && {
            city: activity.location.city.name,
          }),
          ...(activity.location.neighborhood && {
            neighborhood: activity.location.neighborhood,
          }),
        },
      });

      await myActivity.save();
      mongoose.set('debug', true);
    });
    res.send('Data successfully saved');
  } catch (err) {
    console.log('Error while saving', err);
  }
};

const searchActivityType = async (text) => {
  try {
    let query = [
    //  { name: { $regex: new RegExp(text, 'i') } },
      { sportType: { $regex: new RegExp(text, 'i') } },
    ];

    console.log('query', query);

   // find (), first argument is the query filter (also known as conditions)
   // second argument is the query projection, which defines what fields to include or exclude from the query

    const results = await Activity.find(
      { $or: query },
      { sportType: 1 } // only return sportType property from the object
    );

   return [...new Set(results.map(obj => obj.sportType))]; // get distinct sportType value from the array

  } catch (err) {
    throw new Error('Failed to search activities from database', err);
  }
};

const getAll = async () => {
  try {
    return await Activity.find();
  } catch (err) {
    throw new Error('Failed to get data from database', err);
  }
};

export {
  writeToDB,
  getAll,
  searchActivityType,
  fetchActivities,
  getEntireActivityList,
};
