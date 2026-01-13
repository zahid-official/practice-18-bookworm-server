import { Request, Response } from "express";
import { httpStatus } from "../../import";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import TutorialService from "./tutorial.service";

// Create tutorial
const createTutorial = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorialService.createTutorial(req?.body);

  // Send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Tutorial created successfully",
    data: result,
  });
});

// Tutorial controller object
const TutorialController = {
  createTutorial,
};

export default TutorialController;
