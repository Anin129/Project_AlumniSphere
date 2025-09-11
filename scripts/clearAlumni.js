import dotenv from 'dotenv';
import connectDB from '../src/dbConfig/dbConfig.js';
import mongoose from 'mongoose';
import Alumni from '../src/models/alumniModel.js';


async function main() {
  try {
    await connectDB();
    const { deletedCount } = await Alumni.deleteMany({});
    console.log(`Deleted ${deletedCount} alumni documents.`);
  } catch (err) {
    console.error('Failed to delete alumni:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

main();
