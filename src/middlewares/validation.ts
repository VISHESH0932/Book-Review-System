import { Request, Response, NextFunction } from 'express';

const sendError = (res: Response, errors: string[]) => {
  res.status(400).json({ error: 'Validation failed', details: errors });
};

export const validateBook = (req: Request, res: Response, next: NextFunction) => {
  const { title, author } = req.body;
  const errors: string[] = [];

  if (!title || typeof title !== 'string' || title.trim() === '') {
    errors.push('Title is required and must be a non-empty string.');
  }
  if (!author || typeof author !== 'string' || author.trim() === '') {
    errors.push('Author is required and must be a non-empty string.');
  }

  if (errors.length > 0) {
    return sendError(res, errors);
  }
  next();
};

export const validateReview = (req: Request, res: Response, next: NextFunction) => {
  const { reviewerName, rating, content } = req.body;
  const errors: string[] = [];

  if (!reviewerName || typeof reviewerName !== 'string' || reviewerName.trim() === '') {
    errors.push('Reviewer name is required and must be a non-empty string.');
  }
  if (rating === undefined || typeof rating !== 'number' || rating < 1 || rating > 5) {
    errors.push('Rating is required and must be a number between 1 and 5.');
  }
  if (!content || typeof content !== 'string' || content.trim() === '') {
    errors.push('Content is required and must be a non-empty string.');
  }

  if (errors.length > 0) {
    return sendError(res, errors);
  }
  next();
};