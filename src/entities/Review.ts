import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Book } from './Book';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reviewerName: string;

  @Column('int')
  rating: number;

  @Column('text')
  content: string;

  @ManyToOne(() => Book, (book) => book.reviews, { onDelete: 'CASCADE' })
  book: Book;

  @Index() // Index for performance on lookups
  @Column()
  bookId: number;
}