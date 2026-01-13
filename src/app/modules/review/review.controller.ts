import { Request, Response } from "express";
import { httpStatus } from "../../import";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import ReviewService from "./review.service";

// Create review
const createReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.decodedToken?.userId;
  const result = await ReviewService.createReview(userId, req?.body);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review submitted successfully",
    data: result,
  });
});

// Review controller object
const ReviewController = {
  createReview,
};

export default ReviewController;
