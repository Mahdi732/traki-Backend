import mongoose from "mongoose";

class DBConnection {
  #mongoUri;

  constructor () {
    this.#mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/traki';
  }

  async connect () {
    try {
      console.log('database is trying to connect. please wait a second...');
      await mongoose.connect(this.#mongoUri);
      console.log('database is connected with success!');
    } catch (e) {
      console.error('database error :', e.message);
      throw e;
    }
  }

  async disconnect() {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
}

export default new DBConnection();