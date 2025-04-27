import mongoose from 'mongoose';
import logger from '../middleware/logger.js';

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://root:root@mongodb-group:27017/groupDb?authSource=admin';

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });
        logger.info(`MongoDB connected successfully to: ${mongoURI}`);
    } catch (err) {
        logger.error('MongoDB connection failed:', { error: err.message });
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;
