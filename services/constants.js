const sportPlacesFields = [
  'name',
  'type.name',
  'type.typeCode',
  'location.coordinates.wgs84',
  'location.address'
];

const typeCodes = ['1120', '1170']; // Activity Codes

const cityCodes = {
  Helsinki: '91',
  Espoo: '49',
};

export { sportPlacesFields, typeCodes, cityCodes };
