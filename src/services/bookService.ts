import { AppDataSource } from '../data-source';
import { Book } from '../entities/Book';
import { Review } from '../entities/Review';
import { redisClient } from '../cache/redisClient';

const bookRepository = AppDataSource.getRepository(Book);
const reviewRepository = AppDataSource.getRepository(Review);

const CACHE_KEY_BOOKS = 'all_books';

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    const cachedBooks = await redisClient.get(CACHE_KEY_BOOKS);
    if (cachedBooks) {
      console.log('Cache hit for GET /books');
      return JSON.parse(cachedBooks);
    }
  } catch (error) {
    console.warn('Redis error on GET:', error.message);
  }

  console.log('Cache miss for GET /books. Fetching from DB.');
  const books = await bookRepository.find();

  try {
    await redisClient.set(CACHE_KEY_BOOKS, JSON.stringify(books), 'EX', 3600);
  } catch (error) {
    console.warn('Redis error on SET:', error.message);
  }

  return books;
};

export const createBook = async (title: string, author: string): Promise<Book> => {
  const newBook = bookRepository.create({ title, author });
  const savedBook = await bookRepository.save(newBook);
  
  try {
    await redisClient.del(CACHE_KEY_BOOKS);
  } catch (error) {
    console.warn('Redis error on DEL:', error.message);
  }

  return savedBook;
};

export const getReviewsForBook = async (bookId: number): Promise<Review[] | null> => {
  const book = await bookRepository.findOneBy({ id: bookId });
  if (!book) return null;
  return await reviewRepository.find({ where: { bookId } });
};

export const createReviewForBook = async (
  bookId: number,
  reviewerName: string,
  rating: number,
  content: string
): Promise<Review | null> => {
  const book = await bookRepository.findOneBy({ id: bookId });
  if (!book) return null;
  
  const newReview = reviewRepository.create({ bookId, reviewerName, rating, content });
  return await reviewRepository.save(newReview);
};