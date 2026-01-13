import AppError from "../../errors/AppError";
import { httpStatus } from "../../import";
import { ITutorial } from "./tutorial.interface";
import Tutorial from "./tutorial.model";

// Create tutorial
const createTutorial = async (payload: ITutorial) => {
  const existingTutorial = await Tutorial.findOne({
    youtubeUrl: payload.youtubeUrl,
  });
  if (existingTutorial) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A tutorial already exists for this Youtube URL"
    );
  }

  const tutorial = await Tutorial.create(payload);
  return tutorial;
};

// Tutorial service object
const TutorialService = {
  createTutorial,
};

export default TutorialService;
