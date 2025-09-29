import dotenv from 'dotenv';
import connectDB from '../src/dbConfig/dbConfig.js';
import mongoose from 'mongoose';
import Alumni from '../src/models/alumniModel.js';


const sampleDepartments = ['CSE', 'ECE', 'ME', 'CE', 'EE'];
const sampleDegrees = ['B.Tech', 'M.Tech', 'MBA'];
const sampleCompanies = ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Meta'];
const samplePositions = ['Software Engineer', 'Senior Engineer', 'Product Manager', 'Data Scientist'];
const sampleLocations = ['Bangalore, IN', 'Hyderabad, IN', 'Pune, IN', 'Delhi, IN', 'Remote'];
const sampleSkills = ['React', 'Node.js', 'MongoDB', 'Python', 'AWS', 'Docker'];

// Human-like names
const firstNames = ['Aarav', 'Ishita', 'Kabir', 'Neha', 'Rohan', 'Priya', 'Vikram', 'Ananya', 'Rahul', 'Meera'];
const lastNames = ['Sharma', 'Verma', 'Patel', 'Gupta', 'Iyer', 'Das', 'Menon', 'Singh', 'Chawla', 'Kulkarni'];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomYear = () => 2005 + Math.floor(Math.random() * 18); // 2005-2022
const randomPhone = () => `+91${Math.floor(9000000000 + Math.random() * 99999999)}`;

const avatarSources = [
  'https://i.pravatar.cc/300?img=1',
  'https://i.pravatar.cc/300?img=2',
  'https://i.pravatar.cc/300?img=3',
  'https://i.pravatar.cc/300?img=4',
  'https://i.pravatar.cc/300?img=5',
  'https://i.pravatar.cc/300?img=6',
  'https://i.pravatar.cc/300?img=7',
  'https://i.pravatar.cc/300?img=8',
  'https://i.pravatar.cc/300?img=9',
  'https://i.pravatar.cc/300?img=10'
];

// Skip ImageKit upload for now, use direct URLs
async function uploadAvatarFromUrl(url, name) {
  return url; // Return the original URL without uploading to ImageKit
}

function generateAlumniData(index) {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[index % lastNames.length];
  const name = `${firstName} ${lastName}`;
  // Include index to ensure unique emails even if names repeat
  const emailHandle = `${firstName}.${lastName}`.toLowerCase().replace(/[^a-z.]/g, '');
  const email = `${emailHandle}${index + 1}@example.com`;

  return {
    name,
    email,
    phone: randomPhone(),
    rollNumber: `ROLL${1000 + index}`,
    department: randomItem(sampleDepartments),
    degree: randomItem(sampleDegrees),
    graduationYear: randomYear(),
    currentCompany: randomItem(sampleCompanies),
    currentPosition: randomItem(samplePositions),
    location: randomItem(sampleLocations),
    skills: Array.from(new Set([randomItem(sampleSkills), randomItem(sampleSkills), randomItem(sampleSkills)]) ),
    bio: 'Passionate alumnus contributing to the community.',
    interests: ['mentoring', 'networking'],
    social: {
      linkedin: `https://www.linkedin.com/in/${emailHandle}${index + 1}`,
      github: `https://github.com/${emailHandle}${index + 1}`,
      twitter: `https://twitter.com/${emailHandle}${index + 1}`,
      website: `https://example.com/${emailHandle}${index + 1}`
    },
    achievements: ['Dean\'s List', 'Open Source Contributor'],
    // Add gamification data
    totalPoints: Math.floor(Math.random() * 100) + 20, // 20-120 points
    totalBadges: Math.floor(Math.random() * 8) + 2, // 2-10 badges
    level: Math.floor(Math.random() * 5) + 1, // Level 1-5
    dailyLoginStreak: Math.floor(Math.random() * 15), // 0-14 day streak
    longestStreak: Math.floor(Math.random() * 30) + 10, // 10-40 day longest streak
    totalLogins: Math.floor(Math.random() * 100) + 20 // 20-120 total logins
  };
}

async function main() {
  try {
    await connectDB();

    const existingCount = await Alumni.countDocuments();
    console.log(`Existing alumni: ${existingCount}`);

    for (let i = 0; i < 10; i++) {
      const data = generateAlumniData(i);
      const avatarUrl = await uploadAvatarFromUrl(avatarSources[i % avatarSources.length], data.name);
      // Set a demo plaintext password; pre-save hook will hash it
      const password = 'Password123!';
      const doc = new Alumni({ ...data, avatarUrl, password });
      await doc.save();
    }

    console.log('Inserted 10 alumni successfully.');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

main();
