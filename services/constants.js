const sportPlacesFields = [
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

const cityCodes = {
  Helsinki: '91',
  Espoo: '49',
};

export { sportPlacesFields, typeCodes, cityCodes };
