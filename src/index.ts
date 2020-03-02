import dotenv from 'dotenv';
dotenv.config();
const { MONGODB_URI, PORT } = process.env;
// 
import mongoose from 'mongoose';
import { app , startServer }  from './src/app';

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(MONGODB_URI, mongooseOptions, () => {
  console.log('MongoDB up.');
})

startServer(PORT);

