import AppError from "../../errors/AppError";
import { httpStatus } from "../../import";
import Book from "../book/book.model";
import Reader from "../reader/reader.model";
import { IReview, ReviewStatus } from "./review.interface";
import Review from "./review.model";

// Create review
const createReview = async (userId: string, payload: IReview) => {
  const book = await Book.findById(payload.bookId);
  if (!book) {
    throw new AppError(httpStatus.NOT_FOUND, "Book not found");
  }

  const reader = await Reader.findOne({ userId });
  if (!reader || reader.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User profile not found");
  }

  const existingReview = await Review.findOne({
    bookId: book._id,
    userId,
  });
  if (existingReview) {
    throw new AppError(
      httpStatus.CONFLICT,
      "You have already reviewed this book"
    );
  }

  const review = await Review.create({
    bookId: book._id,
    userId,
    userName: reader.name,
    rating: payload.rating,
    review: payload.review,
    status: ReviewStatus.PENDING,
  });

  return review;
};

// Review service object
const ReviewService = {
  createReview,
};

export default ReviewService;
