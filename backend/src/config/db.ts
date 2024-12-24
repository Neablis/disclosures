import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/home_disclosure');
    console.log(`MongoDB connected: ${conn.connection.host}: ${conn.connection.port} on database ${conn.connection.name}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`Unknown error: ${error}`);
    }
    process.exit(1); // Exit process with failure
  }
};


export default connectDB;