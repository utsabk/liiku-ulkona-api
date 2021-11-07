'use strict';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ActivitySchema = new Schema({
  sportsPlaceId: Number,
  name:String,
  address:String,
  type: {
    name: String,
    typeCode: Number,
  },
  location:{
    address:String,
    coordinates: {
      lon: Number,
      lat: Number,
    },
  }
  
});

export default mongoose.model('Activity', ActivitySchema);
