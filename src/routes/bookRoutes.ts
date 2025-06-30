import { Router } from 'express';
import { getAllBooks,createBook,getReviewsForBook,createReviewForBook } from '../controllers/bookController'; 
import { validateBook, validateReview } from '../middlewares/validation';

const router = Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Retrieve a list of all books
 *     description: Fetches a list of all books. Tries to serve from cache first. If cache is empty, it fetches from the database and populates the cache.
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/books', getAllBooks);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Add a new book
 *     description: Creates a new book and adds it to the database. Invalidates the book list cache.
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBook'
 *     responses:
 *       201:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Validation error for invalid input.
 */
router.post('/books', validateBook, createBook);

/**
 * @openapi
 * /books/{id}/reviews:
 *   get:
 *     summary: Get reviews for a specific book
 *     description: Fetches all reviews associated with a given book ID.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID.
 *     responses:
 *       200:
 *         description: A list of reviews for the book.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Book not found.
 */
router.get('/books/:id/reviews', getReviewsForBook);

/**
 * @openapi
 * /books/{id}/reviews:
 *   post:
 *     summary: Add a review for a book
 *     description: Creates a new review for a specific book.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID to add a review to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewReview'
 *     responses:
 *       201:
 *         description: The created review.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Validation error for invalid input.
 *       404:
 *         description: Book not found.
 * 
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The book's unique identifier.
 *         title:
 *           type: string
 *           description: The title of the book.
 *         author:
 *           type: string
 *           description: The author of the book.
 *     NewBook:
 *       type: object
 *       required: [title, author]
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the book.
 *         author:
 *           type: string
 *           description: The author of the book.
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The review's unique identifier.
 *         reviewerName:
 *           type: string
 *           description: Name of the person who wrote the review.
 *         rating:
 *           type: integer
 *           description: A rating from 1 to 5.
 *         content:
 *           type: string
 *           description: The text content of the review.
 *         bookId:
 *           type: integer
 *           description: The ID of the book this review is for.
 *     NewReview:
 *       type: object
 *       required: [reviewerName, rating, content]
 *       properties:
 *         reviewerName:
 *           type: string
 *           description: Name of the person who wrote the review.
 *         rating:
 *           type: integer
 *           description: A rating from 1 to 5.
 *         content:
 *           type: string
 *           description: The text content of the review.
 */
router.post('/books/:id/reviews', validateReview, createReviewForBook);

export default router;