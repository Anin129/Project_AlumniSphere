import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CommunityPost from '../src/models/communitypostModel.js';
import Alumni from '../src/models/alumniModel.js';
import Student from '../src/models/studentModel.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your_db_name';

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function upsertUser(Model, query, doc) {
  const result = await Model.findOneAndUpdate(query, { $setOnInsert: doc }, { new: true, upsert: true });
  return result;
}

async function uploadSamplePosts() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB.');

    const alumniNames = ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Neha Gupta', 'Ravi Singh'];
    const studentNames = ['Aarav Mehta', 'Saanvi Reddy', 'Vivaan Joshi', 'Ananya Iyer', 'Krishna Nair'];

    const alumniList = await Promise.all(
      alumniNames.map(name =>
        upsertUser(Alumni, { email: `${name.split(' ').join('.').toLowerCase()}@example.com` }, {
          name,
          email: `${name.split(' ').join('.').toLowerCase()}@example.com`,
          graduationYear: 2015 + Math.floor(Math.random() * 5)
        })
      )
    );

    const studentList = await Promise.all(
      studentNames.map(name =>
        upsertUser(Student, { email: `${name.split(' ').join('.').toLowerCase()}@example.com` }, {
          name,
          email: `${name.split(' ').join('.').toLowerCase()}@example.com`,
          graduationYear: 2024 + Math.floor(Math.random() * 3)
        })
      )
    );

    const samplePosts = [
      {
        title: 'Guidance for Final Year Project Ideas',
        content: 'Alumni, what are some innovative final year project ideas in AI and Data Science fields?',
        authorModel: 'Student',
        author: getRandomElement(studentList)._id,
        category: 'academic',
        tags: ['projects', 'AI', 'Data Science'],
        status: 'open',
        isResolved: false,
        resolvedAt: null,
        resolvedByModel: null,
        resolvedBy: null,
        votes: 25,
        comments: [
          {
            authorModel: 'Alumni',
            author: getRandomElement(alumniList)._id,
            content: 'Explore projects around predictive analytics in healthcare – it’s both impactful and in demand.'
          },
          {
            authorModel: 'Student',
            author: getRandomElement(studentList)._id,
            content: 'Thank you! Any recommended datasets for practice?'
          }
        ]
      },
      {
        title: 'Alumni Career Journey Insights',
        content: 'Dear alumni, can you share your career growth and key learnings after graduation?',
        authorModel: 'Student',
        author: getRandomElement(studentList)._id,
        category: 'career',
        tags: ['career', 'journey', 'advice'],
        status: 'open',
        isResolved: false,
        resolvedAt: null,
        resolvedByModel: null,
        resolvedBy: null,
        votes: 40,
        comments: [
          {
            authorModel: 'Alumni',
            author: getRandomElement(alumniList)._id,
            content: 'Started in a small firm, later transitioned to a large multinational. Networking is key.'
          },
          {
            authorModel: 'Student',
            author: getRandomElement(studentList)._id,
            content: 'Very inspiring! How important was your college network for growth?'
          }
        ]
      },
      {
        title: 'Upcoming Hackathon Event Details',
        content: 'We are hosting an inter-college hackathon on August 15th. Open to all branches. Prizes worth INR 50,000.',
        authorModel: 'Alumni',
        author: getRandomElement(alumniList)._id,
        category: 'events',
        tags: ['hackathon', 'event', 'innovation'],
        status: 'open',
        isResolved: false,
        resolvedAt: null,
        resolvedByModel: null,
        resolvedBy: null,
        votes: 55,
        comments: [
          {
            authorModel: 'Student',
            author: getRandomElement(studentList)._id,
            content: 'Excited for this! Is team registration allowed?'
          },
          {
            authorModel: 'Alumni',
            author: getRandomElement(alumniList)._id,
            content: 'Yes, up to 3 members per team. Details are on the college portal.'
          }
        ]
      },
      {
        title: 'How Alumni Can Help Students in Internships',
        content: 'Alumni, what is the best way you have helped current students secure internships?',
        authorModel: 'Student',
        author: getRandomElement(studentList)._id,
        category: 'internships',
        tags: ['internships', 'help', 'alumni'],
        status: 'open',
        isResolved: false,
        resolvedAt: null,
        resolvedByModel: null,
        resolvedBy: null,
        votes: 33,
        comments: [
          {
            authorModel: 'Alumni',
            author: getRandomElement(alumniList)._id,
            content: 'Shared contacts and gave resume review sessions, which helped students get shortlisted.'
          },
          {
            authorModel: 'Student',
            author: getRandomElement(studentList)._id,
            content: 'Amazing! Would love to contribute as alumni later on.'
          }
        ]
      },
      {
        title: 'Alumni-Student Mentorship Program Launch',
        content: 'We are launching a new mentorship program where alumni mentor students in career, academics, and personal development.',
        authorModel: 'Alumni',
        author: getRandomElement(alumniList)._id,
        category: 'general',
        tags: ['mentorship', 'guidance', 'alumni'],
        status: 'open',
        isResolved: false,
        resolvedAt: null,
        resolvedByModel: null,
        resolvedBy: null,
        votes: 85,
        comments: [
          {
            authorModel: 'Student',
            author: getRandomElement(studentList)._id,
            content: 'This is exactly what we needed! How do we sign up?'
          },
          {
            authorModel: 'Alumni',
            author: getRandomElement(alumniList)._id,
            content: 'Sign-up link will be posted on the official portal next week.'
          }
        ]
      }
    ];

    const insertedPosts = await CommunityPost.insertMany(samplePosts);
    console.log(`Inserted ${insertedPosts.length} unique posts with embedded comments.`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

uploadSamplePosts();
