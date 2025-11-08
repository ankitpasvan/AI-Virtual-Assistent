import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(" database connected successfully");
  } catch (error) {
    console.log("mongoDB not connected");
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
