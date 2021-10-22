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

const URL = `${process.env.API_URL}sports-places?lang=en&${fieldsString}&${cityCodeString}`;

const fetchActivities = async () => {
  const activities = await fetchResources(URL);
  return activities;
};

const writeToDB = async (req, res) => {
  const activities = await fetchActivities();

  try {
    activities.forEach(async (activity) => {
      const myActivity = new Activity({
        ...(activity.name && { name: activity.name }),
        sportType: activity.type.name,
        coordinates: activity.location.coordinates.wgs84,
        infoFi: activity.properties.infoFi,
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

export { writeToDB };
