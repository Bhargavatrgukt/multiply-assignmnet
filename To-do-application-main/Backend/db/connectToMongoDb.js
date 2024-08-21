import mongoose from "mongoose";

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL); // Use MONGODB_URL instead
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(`Connection failed: ${error.message}`);
  }
};

export default connectToMongoDb;
