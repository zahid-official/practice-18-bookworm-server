import AppError from "../../errors/AppError";
import { httpStatus } from "../../import";
import QueryBuilder from "../../utils/queryBuilder";
import Genre from "./genre.model";
import { IGenre } from "./genre.interface";

// Get all genres
const getAllGenres = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder<IGenre>(
    Genre.find({ isDeleted: { $ne: true } }),
    query
  );

  if (query?.searchTerm) {
    queryBuilder.search(["name", "description"]);
  }

  const genres = await queryBuilder
    .sort()
    .filter()
    .paginate()
    .fieldSelect()
    .build();

  const meta = await queryBuilder.meta();
  return { data: genres, meta };
};

// Create genre
const createGenre = async (payload: IGenre) => {
  const existingGenre = await Genre.findOne({ name: payload.name });
  if (existingGenre) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Genre '${payload.name}' already exists`
    );
  }

  const genre = await Genre.create(payload);
  return genre;
};


// Genre service object
const GenreService = {
  getAllGenres,
  createGenre,
};

export default GenreService;
