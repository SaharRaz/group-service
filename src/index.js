import express from 'express';
import connectDB from './db/dbConnection.js';
import groupsRoutes from './routes/group.routes.js';
import logger from './systems/logger.js';

// Initialize MongoDB Connection
const initializeDatabase = async () => {
    try {
        await connectDB();
        logger.info('Database connection established successfully.');
    } catch (error) {
        logger.error('Failed to initialize database connection:', { error: error.message });
        process.exit(1); // Exit the process if database connection fails
    }
};

const startServices = async () => {
    const app = express();
    app.use(express.json());

    // Register all routes for each service
    app.use('/groups', groupsRoutes);


    // Define ports for each service
    const PORT = 5004;

    // Start an instance of the app for each service
    app.listen(PORT, () => {
        logger.info(`Service ${PORT} running on port ${PORT}`);
        console.log(`Service ${PORT} running on http://localhost:${PORT}`);
    });
};

// Initialize Database Connection and Start Services
initializeDatabase().then(() => {
    startServices().then(() => {});
});
