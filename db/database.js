'use strict';
import mongoose from 'mongoose';

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected sucsessfully');
  } catch (e) {
    throw new Error (e);
  }
})();

export default mongoose.connection;
