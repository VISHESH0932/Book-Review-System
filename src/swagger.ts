import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Review Service API',
      version: '1.0.0',
      description: 'A simple Express API for managing books and their reviews, with caching.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
  },
  // The path should be relative to the project root where the command is run
  apis: ['./src/routes/*.ts'], 
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;