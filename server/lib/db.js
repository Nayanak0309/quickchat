import mongoose from "mongoose";

//function to connect to the mongodb

export const connectDB = async () => {
  try {
    mongoose.connection.on('connected', ()=> console.log('Database Connected'));
    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
    console.log(" MongoDB connected successfully");
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    process.exit(1);
  }
};
