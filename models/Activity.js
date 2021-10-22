'use strict';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  name: String,
  sportType: String,
  coordinates: {
    lon: Number,
    lat: Number,
  },
  infoFi: String,
  contact: {
    email: String,
    phone: String,
    webAddress: String,
  },
  address: {
    address: String,
    postalCode: String,
    postalOffice: String,
    city: String,
    neighborhood: String,
  },
});

export default mongoose.model('Activity', ActivitySchema);
