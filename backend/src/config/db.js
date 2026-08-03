import dns from "node:dns";
import mongoose from 'mongoose'
// import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const connectDB = async () => {
    try {
        console.log(process.env.MONGO_URL);
        const conn = await mongoose.connect(process.env.MONGO_URL, {
        });
        console.log(`mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("DB Connection Error:", error.message);
        process.exit(1);
    }
}
export default connectDB;