import { Schema, model } from "mongoose";
import { IGenre } from "./genre.interface";

// Mongoose schema for genre model
const genreSchema = new Schema<IGenre>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Create mongoose model from genre schema
const Genre = model<IGenre>("Genre", genreSchema);
export default Genre;
