import mongoose from 'mongoose';

export class DatabaseConnection {
  static async connect(mongoUri: string): Promise<void> {
    try {
      await mongoose.connect(mongoUri);
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  }

  static async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}
