import app from './app';
import { AppDataSource } from './data-source';
import * as dotenv from 'dotenv';
import { redisClient } from './cache/redisClient';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Data Source has been initialized!');
    
    // Redis client connection is handled in its own module
    // to allow for graceful failure.

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`API documentation available at http://localhost:${PORT}/docs`);
    });
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  }
};

startServer();