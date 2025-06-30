import request from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../app';
import { AppDataSource } from '../../data-source';
import { redisClient } from '../../cache/redisClient';
import { Book } from '../../entities/Book';

describe('Book Endpoints - Integration Tests', () => {
  let connection: DataSource;
  const bookRepository = AppDataSource.getRepository(Book);

  beforeAll(async () => {
    // Use a separate test database configuration in a real project
    connection = await AppDataSource.initialize();
  });

  beforeEach(async () => {
    // Clean up database and cache before each test
    await connection.synchronize(true); // Drops and re-creates the schema
    await (redisClient as any).flushall(); // Clear mock redis
  });

  afterAll(async () => {
    await connection.destroy();
  });

  describe('GET /books - Caching Logic', () => {
    it('should fetch from DB on first call (cache miss) and from cache on second call (cache hit)', async () => {
      // Setup: Create a book directly in the DB
      const book = await bookRepository.save({ title: 'Cache Test', author: 'Redis' });

      const getSpy = jest.spyOn(redisClient, 'get');
      const setSpy = jest.spyOn(redisClient, 'set');
      const findSpy = jest.spyOn(bookRepository, 'find');

      // 1. First request (cache miss)
      const res1 = await request(app).get('/api/v1/books');

      expect(res1.status).toBe(200);
      expect(res1.body).toEqual([expect.objectContaining({ title: 'Cache Test' })]);
      
      // Verify behavior
      expect(getSpy).toHaveBeenCalledWith('all_books');
      expect(findSpy).toHaveBeenCalledTimes(1); // DB was hit
      expect(setSpy).toHaveBeenCalledTimes(1); // Cache was populated

      // 2. Second request (cache hit)
      const res2 = await request(app).get('/api/v1/books');
      
      expect(res2.status).toBe(200);
      expect(res2.body).toEqual([expect.objectContaining({ title: 'Cache Test' })]);

      // Verify behavior
      expect(getSpy).toHaveBeenCalledTimes(2);
      expect(findSpy).toHaveBeenCalledTimes(1); // DB was NOT hit again
      expect(setSpy).toHaveBeenCalledTimes(1); // Cache was NOT populated again
    });
  });
});