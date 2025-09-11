import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CommunityPost from '../src/models/communityPostModel.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function clearCommunityPosts() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB.');

    const result = await CommunityPost.deleteMany({});
    console.log(`Deleted ${result.deletedCount || 0} community posts.`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('Error while clearing posts:', err);
    try { await mongoose.disconnect(); } catch {}
    process.exit(1);
  }
}

clearCommunityPosts();


