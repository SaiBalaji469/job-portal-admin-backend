// const mongoose = require('mongoose');
// const Job = require('./models/Job');
// require('dotenv').config();

// const sampleJobs = [
//   {
//     title: 'Full Stack Developer',
//     company: 'Amazon',
//     companyLogo: 'https://logo.clearbit.com/amazon.com',
//     location: 'Chennai',
//     jobType: 'Full Time',
//     salary: '12LPA',
//     experience: '1-3 yr Exp',
//     postedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
//     isOnsite: true,
//     description: 'A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized itineraries.'
//   },
//   {
//     title: 'Node Js Developer',
//     company: 'Tesla',
//     companyLogo: 'https://logo.clearbit.com/tesla.com',
//     location: 'Bangalore',
//     jobType: 'Full Time',
//     salary: '12LPA',
//     experience: '1-3 yr Exp',
//     postedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
//     isOnsite: true,
//     description: 'A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized itineraries.'
//   },
//   {
//     title: 'UX/UI Designer',
//     company: 'Bulb',
//     companyLogo: 'https://logo.clearbit.com/bulb.co.uk',
//     location: 'Hyderabad',
//     jobType: 'Full Time',
//     salary: '12LPA',
//     experience: '1-3 yr Exp',
//     postedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
//     isOnsite: true,
//     description: 'A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized itineraries.'
//   }
// ];

// const seedDatabase = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB');

//     // Clear existing data
//     await Job.deleteMany({});
//     console.log('Cleared existing jobs');

//     // Insert sample data
//     const jobs = await Job.insertMany(sampleJobs);
//     console.log(`Inserted ${jobs.length} sample jobs`);

//     // Disconnect from MongoDB
//     await mongoose.disconnect();
//     console.log('Disconnected from MongoDB');
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     process.exit(1);
//   }
// };

// seedDatabase(); 
