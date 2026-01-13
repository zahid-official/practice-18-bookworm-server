import { Router } from "express";
import validateSchema from "../../middlewares/validateSchema";
import validateToken from "../../middlewares/validateToken";
import { Role } from "../user/user.interface";
import TutorialController from "./tutorial.controller";
import { createTutorialZodSchema } from "./tutorial.validation";

// Initialize router
const router = Router();

// Post routes
router.post(
  "/create",
  validateToken(Role.ADMIN),
  validateSchema(createTutorialZodSchema),
  TutorialController.createTutorial
);

// Export tutorial routes
const TutorialRoutes = router;
export default TutorialRoutes;
