import { Request, Response } from "express";
import { httpStatus } from "../../import";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import GenreService from "./genre.service";

// Get all genres
const getAllGenres = catchAsync(async (req: Request, res: Response) => {
  const query = req?.query;
  const result = await GenreService.getAllGenres(query as Record<string, string>);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All genres retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

// Create genre
const createGenre = catchAsync(async (req: Request, res: Response) => {
  const result = await GenreService.createGenre(req?.body);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Genre created successfully",
    data: result,
  });
});

// Genre controller object
const GenreController = {
  getAllGenres,
  createGenre,
};

export default GenreController;
