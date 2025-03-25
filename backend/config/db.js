import mongoose from 'mongoose';

// making a function to connect to mongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to mongoDB`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;