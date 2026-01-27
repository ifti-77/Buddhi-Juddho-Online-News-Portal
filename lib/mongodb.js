
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export default dbConnect;

let connection = null;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  if(!connection)
  {
    connection = await mongoose.connect(MONGODB_URI);
  }
  return connection;
}