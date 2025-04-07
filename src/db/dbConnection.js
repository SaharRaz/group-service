import mongoose from 'mongoose';
import logger from '../systems/logger.js';

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://root:root@mongodb-group:27017/groupDb?authSource=admin';

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Wait for MongoDB to respond for 10 seconds
        });
        logger.info(`MongoDB connected successfully to: ${mongoURI}`);
    } catch (err) {
        logger.error('MongoDB connection failed:', { error: err.message });
        // Retry after 5 seconds if the connection fails
        setTimeout(connectDB, 5000);
    }
};

// Automatically call connectDB to establish the connection
export default connectDB;
