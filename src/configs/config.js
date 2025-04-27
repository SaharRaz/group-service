import dotenv from 'dotenv';
dotenv.config();

export const env = {
    PORT: process.env.PORT || 5002,
    MONGO_URI: process.env.MONGO_URI,
    NOTIFICATION_SERVICE_URL: process.env.NOTIFICATION_SERVICE_URL
};
