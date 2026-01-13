import { Router } from "express";
import validateSchema from "../../middlewares/validateSchema";
import validateToken from "../../middlewares/validateToken";
import { Role } from "../user/user.interface";
import ReviewController from "./review.controller";
import { createReviewZodSchema } from "./review.validation";

// Initialize router
const router = Router();

// Post routes
router.post(
  "/create",
  validateToken(Role.READER),
  validateSchema(createReviewZodSchema),
  ReviewController.createReview
);

// Export review routes
const ReviewRoutes = router;
export default ReviewRoutes;
