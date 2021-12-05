import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  points: { type: Number, default: 0 },
});

export default mongoose.model('User', userSchema);
