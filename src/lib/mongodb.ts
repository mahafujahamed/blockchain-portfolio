import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'portfolio',
    });
    isConnected = true;
    console.log('🟢 MongoDB connected');
  } catch (err) {
    console.error('🔴 MongoDB connection error', err);
  }
};
