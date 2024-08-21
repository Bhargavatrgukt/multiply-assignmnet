// server.js
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './auth/route.js';
import todoRoutes from './auth/todos.route.js'; // Correct path to your todoRoutes file
import connectToMongoDb from './db/connectToMongoDb.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser())

// Authentication routes
app.use('/api/auth', authRoutes);

// To-do routes
app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the To-Do API. Use /api/auth for authentication routes and /api/todos for to-do routes.');
});

// Handle 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});


// Start the server and connect to MongoDB
app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`App is running on ${PORT}`);
});
