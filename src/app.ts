import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import bookRoutes from './routes/bookRoutes';
import { errorHandler } from './middlewares/errorHandler';
import swaggerSpec from './swagger';
const app: Application = express();

// Middlewares
app.use(express.json());

// API Routes
app.use('/api/v1', bookRoutes);

// Swagger Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Central Error Handler
app.use(errorHandler);

export default app;