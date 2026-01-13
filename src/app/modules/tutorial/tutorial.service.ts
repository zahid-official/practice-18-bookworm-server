import AppError from "../../errors/AppError";
import { httpStatus } from "../../import";
import QueryBuilder from "../../utils/queryBuilder";
import { ITutorial } from "./tutorial.interface";
import Tutorial from "./tutorial.model";

// Get all tutorials
const getAllTutorials = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder<ITutorial>(Tutorial.find(), query);

  if (query?.searchTerm) {
    queryBuilder.search(["title", "description"]);
  }

  const tutorials = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .build();

  const meta = await queryBuilder.meta();
  return { data: tutorials, meta };
};

// Get single tutorial
const getSingleTutorial = async (id: string) => {
  const tutorial = await Tutorial.findById(id);
  if (!tutorial) {
    throw new AppError(httpStatus.NOT_FOUND, "Tutorial not found");
  }
  return tutorial;
};

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
  getAllTutorials,
  getSingleTutorial,
  createTutorial,
};

export default TutorialService;
