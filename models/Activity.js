'use strict';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  sportsPlaceId: Number,
  type: {
    name: String,
    typeCode: Number,
  },
  coordinates: {
    lon: Number,
    lat: Number,
  },
});

export default mongoose.model('Activity', ActivitySchema);
