const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
console.log('Attempting to connect to MongoDB...');
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Force IPv4
  maxPoolSize: 10,
  minPoolSize: 5,
})
.then(() => {
  console.log('Connected to MongoDB successfully');
  console.log('Connection state:', mongoose.connection.readyState);
})
.catch((err) => {
  console.error('MongoDB connection error details:', {
    name: err.name,
    message: err.message,
    code: err.code,
    codeName: err.codeName,
    errorLabels: err[Symbol.for('errorLabels')],
    stack: err.stack
  });
  
  if (err.name === 'MongoServerSelectionError') {
    console.error('Could not connect to MongoDB Atlas. Please check:');
    console.error('1. Your network connection');
    console.error('2. IP whitelist settings in MongoDB Atlas');
    console.error('3. Cluster status in MongoDB Atlas');
    console.error('4. Username and password are correct');
  }
  process.exit(1);
});

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during MongoDB disconnection:', err);
    process.exit(1);
  }
});

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Job Portal API' });
});

// Routes
const jobRoutes = require('./routes/jobs');
app.use('/api/jobs', jobRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API is available at http://localhost:${PORT}`);
}); 