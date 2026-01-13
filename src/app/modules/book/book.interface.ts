import { Types } from "mongoose";

// Book interface definition
export interface IBook {
  _id?: Types.ObjectId;
  title: string;
  author: string;
  genre: Types.ObjectId;
  description: string;
  coverImage: string;
  pages: number;
  averageRating: number;
  ratingsCount: number;
  isDeleted: boolean;
  createdAt?: Date;
}
