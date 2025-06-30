import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/bookService';

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author } = req.body;
    const newBook = await bookService.createBook(title, author);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const getReviewsForBook = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const bookId = parseInt(req.params.id, 10);
    const reviews = await bookService.getReviewsForBook(bookId);
    if (reviews === null) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const createReviewForBook = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  try {
    const bookId = parseInt(req.params.id, 10);
    const { reviewerName, rating, content } = req.body;
    const newReview = await bookService.createReviewForBook(
      bookId,
      reviewerName,
      rating,
      content
    );
    if (newReview === null) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};