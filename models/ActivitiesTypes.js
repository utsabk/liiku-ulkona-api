'use strict';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ActivityTypesSchema = new Schema({
  typeCode: Number,
  name: String,
  description: String,
  geometryType: String,
  subCategory: Number
});

export default mongoose.model('ActivityTypes', ActivityTypesSchema);
