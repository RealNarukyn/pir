import mongoose from 'mongoose';

import { config } from '../config';

export class DatabaseController {
  static connectDB = async () => {
    await mongoose.connect(config.MONGO.dbURL)
        .then(() => console.log('Connected to Database 🖥️'))
        .catch((err) => {
          throw new Error(err);
        });
  };

  static disconnectDB = async () =>
    await mongoose.disconnect().then(() => console.log('DB Closed...'));
};
