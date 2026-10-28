import 'dotenv/config'; // must be first
import mongoose from 'mongoose';

const { MONGODB_URI, NODE_ENV } = process.env

if (!MONGODB_URI) { 
  throw new Error('Please define the MONGODB_URI env variable inside .env')
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log(`Connected to database in ${NODE_ENV} mode`)
  } catch(error) {
    console.log('Error connecting to database:', error);

    process.exit(1)
  }
}

export default connectToDatabase;