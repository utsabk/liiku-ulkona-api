'use strict';
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  dp: String,
});

export default mongoose.model('User', userSchema);
