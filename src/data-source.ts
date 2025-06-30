import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Book } from './entities/Book';
import { Review } from './entities/Review';
import { InitialSchema1677654321000 } from './migrations/1677654321000-InitialSchema';

dotenv.config();

export const AppDataSource = new DataSource({
  type: (process.env.DB_TYPE as any) || 'sqlite',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || 'db.sqlite',
  synchronize: false,
  logging: false,
  entities: [Book, Review],
  migrations: [InitialSchema1677654321000],
  subscribers: [],
});