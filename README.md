# 📚 Book Review Service
This is a comprehensive Book Review API built with a modern, robust tech stack. It demonstrates best practices in API design, data persistence, caching, testing, and project structure.

## 🚀 Features
- **RESTful API:** Clean, predictable endpoints for managing books and reviews.
- **Database:** Uses TypeORM with SQLite.
- **Caching:** Integrates Redis to cache expensive queries, with a graceful fallback mechanism.
- **Validation:** Server-side validation for all incoming data.
- **API Documentation:** Automatically generated and interactive API docs via Swagger/OpenAPI.
- **Testing:** Unit + integration tests with Jest + Supertest.
- **Containerized:** Docker support for Redis (SQLite runs locally)


## 🛠 Tech Stack
- Backend: Node.js, Express.js, TypeScript
- ORM: TypeORM
- Database: SQLite
- Caching: Redis, ioredis
- Testing: Jest, Supertest
- API Docs: Swagger (swagger-ui-express, swagger-jsdoc)
- Containerization: Docker (for Redis)

## 📂 Project Structure

Generated code
- src/
-    ├── cache/        
-    ├── controllers/   
-    ├── entities/      
-    ├── middlewares/   
-    ├── migrations/    
-    ├── routes/        
-    ├── services/      
-    ├── tests/         
-    ├── app.ts  
-    ├── data-source.ts
-    ├── swagger.ts
-    └── server.ts



## ✅ Prerequisites
- Node.js v18+
- Docker (for running the Redis cache)

### 1️⃣ Clone the repository

git clone <repository_url>

cd book-review-service

### 2️⃣ Setup environment variables
Create a .env file from the example template.
  
PORT=3000


DB_TYPE=sqlite

DB_DATABASE=./db.sqlite

REDIS_URL=redis://localhost:6379



### 3️⃣ Install dependencies

npm install


### 4️⃣ Start Redis with Docker
This command will pull the Redis image and run it in a container on the required port.


docker run -d -p 6379:6379 --redis 

This runs Redis locally on localhost:6379.

### 5️⃣ Run database migrations
This will create the Book and Review tables in your local SQLite database file.

npm run migration:run

### 6️⃣ Start the app
This command starts the server with nodemon for automatic restarts on file changes.

npm run dev

Server will be available at: http://localhost:3000
Interactive API docs will be at: http://localhost:3000/docs

### 7️⃣ Run tests

npm run test

## 📌 API Endpoints


  
- **GET	/api/v1/books**	 List all books (with caching)

- **POST	/api/v1/books**	Add a new book

- **GET	/api/v1/books/:id/reviews**	List reviews for a specific book

- **POST	/api/v1/books/:id/reviews**	Add a review to a specific book


## 🛠️ TypeORM CLI for Migrations
**To generate a new migration after modifying an entity:**

npm run typeorm migration:generate src/migrations/YourMigrationName

**To run any pending migrations:**

npm run migration:run

## 🚀 Summary
- **SQLite**: Lightweight local database, stored in the database.sqlite file.
- **Redis**: In-memory cache for performance, run via Docker.
- **.env**: Main configuration file for database and Redis connections.
- **TypeORM Migrations**: A clean and version-controlled way to manage database schema changes.