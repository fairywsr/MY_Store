import mongoose from "mongoose";
import"dotenv/config"
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URL}/myStore`);
    console.log("database ✅ connected");
  } catch (error) {
    console.log(`connection ❌ failed ${error.message}`);
  }
};

export default connectDB;
