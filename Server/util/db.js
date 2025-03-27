import mongoose from "mongoose";

const connectDB = async () => { 
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log("Error in connecting to database ", error.message);
        
    }
}

export default connectDB