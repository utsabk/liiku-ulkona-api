import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import db from './db/database.js';
import User from './models/user.js';

const app = express();

app.get('/api', async (req, res) => {
  const fields = [
    'properties',  
    'schoolUse',
    'email',
    'type.name',
    'location.sportsPlaces',
    'renovationYears',
    'admin',
    'www',
    'location.coordinates.tm35fin',
    'location.geometries',
    'name',
    'type.typeCode',
    'location.locationId',
    'constructionYear',
    'freeUse',
    'location.city.name',
    'lastModified',
    'location.postalCode',
    'location.postalOffice',
    'location.city.cityCode',
    'phoneNumber',
    'location.neighborhood',
    'owner',
    'location.coordinates.wgs84',
    'location.address',
  ];

  const typeCodes = ['1120', '1170']; // Activity Codes

  const cityCodes = ['91']; // City code for Helsinki

  const fieldsString = fields.map((field) => `fields=${field}`).join('&');
  const typeCodesString = typeCodes
    .map((typeCode) => `typeCodes=${typeCode}`)
    .join('&');
  const cityCodeString = cityCodes
    .map((cityCode) => `cityCodes=${cityCode}`)
    .join('&');

  const URL = `${process.env.API_URL}&${fieldsString}&${cityCodeString}`;

  console.log('tets URL', URL);

  const response = await fetch(URL);
  const data = await response.json();
  //console.log('new user', data);
  res.send(data);

});

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
