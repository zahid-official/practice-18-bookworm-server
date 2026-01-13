import { Router } from "express";
import validateSchema from "../../middlewares/validateSchema";
import validateToken from "../../middlewares/validateToken";
import { Role } from "../user/user.interface";
import GenreController from "./genre.controller";
import { createGenreZodSchema } from "./genre.validation";

// Initialize router
const router = Router();

// Get routes
router.get(
  "/",
  validateToken(...Object.values(Role)),
  GenreController.getAllGenres
);

// Post routes
router.post(
  "/create",
  validateToken(Role.ADMIN),
  validateSchema(createGenreZodSchema),
  GenreController.createGenre
);

// Export genre routes
const GenreRoutes = router;
export default GenreRoutes;
