import connectDB from '../src/dbConfig/dbConfig.js';
import { uploadImageToImageKit } from '../src/lib/imagekit.js';
import mongoose from 'mongoose';
import Student from '../src/models/studentModel.js';

const sampleDepartments = ['CSE', 'ECE', 'ME', 'CE', 'EE'];
const sampleDegrees = ['B.Tech', 'M.Tech', 'MBA'];
const sampleLocations = ['Bangalore, IN', 'Hyderabad, IN', 'Pune, IN', 'Delhi, IN', 'Remote'];
const sampleSkills = ['React', 'Node.js', 'MongoDB', 'Python', 'AWS', 'Docker'];

// Human-like names
const firstNames = ['Aarav', 'Ishita', 'Kabir', 'Neha', 'Rohan', 'Priya', 'Vikram', 'Ananya', 'Rahul', 'Meera', 'Dev', 'Sanya', 'Arjun', 'Tara', 'Kunal', 'Shruti', 'Om', 'Dia', 'Rehan', 'Kritika'];
const lastNames = ['Sharma', 'Verma', 'Patel', 'Gupta', 'Iyer', 'Das', 'Menon', 'Singh', 'Chawla', 'Kulkarni'];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomYear = () => 2025 + Math.floor(Math.random() * 4); // expected graduation 2025-2028
const randomPhone = () => `+91${Math.floor(9000000000 + Math.random() * 99999999)}`;

const avatarSources = Array.from({ length: 20 }, (_, i) => `https://i.pravatar.cc/300?img=${(i % 70) + 1}`);

async function uploadAvatarFromUrl(url, name) {
  const { url: uploadedUrl } = await uploadImageToImageKit(url, `${name.replace(/\s+/g, '_').toLowerCase()}_avatar.jpg`, 'students');
  return uploadedUrl;
}

function generateStudentData(index) {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[index % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const emailHandle = `${firstName}.${lastName}`.toLowerCase().replace(/[^a-z.]/g, '');
  const email = `${emailHandle}${index + 1}@example.com`;

  return {
    name,
    email,
    phone: randomPhone(),
    rollNumber: `STU${2000 + index}`,
    department: randomItem(sampleDepartments),
    degree: randomItem(sampleDegrees),
    graduationYear: randomYear(),
    location: randomItem(sampleLocations),
    skills: Array.from(new Set([randomItem(sampleSkills), randomItem(sampleSkills), randomItem(sampleSkills)]) ),
    bio: 'Curious student eager to learn and collaborate.',
    interests: ['open-source', 'hackathons'],
    social: {
      linkedin: `https://www.linkedin.com/in/${emailHandle}${index + 1}`,
      github: `https://github.com/${emailHandle}${index + 1}`,
      twitter: `https://twitter.com/${emailHandle}${index + 1}`,
      website: `https://example.com/${emailHandle}${index + 1}`
    },
    isSeekingInternship: Math.random() > 0.5,
    isSeekingJob: Math.random() > 0.7,
    portfolioUrl: `https://portfolio.example.com/${emailHandle}${index + 1}`,
    achievements: ['Hackathon Participant']
  };
}

async function main() {
  try {
    await connectDB();

    const existingCount = await Student.countDocuments();
    console.log(`Existing students: ${existingCount}`);

    for (let i = 0; i < 20; i++) {
      const data = generateStudentData(i);
      const avatarUrl = await uploadAvatarFromUrl(avatarSources[i], data.name);
      const password = 'Password123!';
      const doc = new Student({ ...data, avatarUrl, password });
      await doc.save();
    }

    console.log('Inserted 20 students successfully.');
  } catch (err) {
    console.error('Seeding students failed:', err);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
}

main();
