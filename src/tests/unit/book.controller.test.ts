import request from 'supertest';
import app from '../../app';
import * as bookService from '../../services/bookService';

// Mock the service layer
jest.mock('../../services/bookService');
const mockedBookService = bookService as jest.Mocked<typeof bookService>;

describe('Book Controller - Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/v1/books', () => {
    it('should return a list of books and a 200 status code', async () => {
      const mockBooks = [{ id: 1, title: 'Unit Test Book', author: 'Jest', reviews: [] }];
      mockedBookService.getAllBooks.mockResolvedValue(mockBooks);

      const response = await request(app).get('/api/v1/books');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockBooks);
      expect(mockedBookService.getAllBooks).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/v1/books', () => {
    it('should create a new book and return 201', async () => {
      const newBook = { title: 'New Test Book', author: 'Supertest' };
      const createdBook = { id: 2, ...newBook, reviews: [] };
      mockedBookService.createBook.mockResolvedValue(createdBook);

      const response = await request(app).post('/api/v1/books').send(newBook);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(createdBook);
      expect(mockedBookService.createBook).toHaveBeenCalledWith(newBook.title, newBook.author);
    });

    it('should return 400 for invalid book data', async () => {
      const invalidBook = { title: 'Only Title' }; // Missing author
      const response = await request(app).post('/api/v1/books').send(invalidBook);

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('Validation failed');
      expect(mockedBookService.createBook).not.toHaveBeenCalled();
    });
  });
});