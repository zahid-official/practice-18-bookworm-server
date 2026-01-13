import { Types } from "mongoose";

// Genre interface definition
export interface IGenre {
  _id?: Types.ObjectId;
  name: string;
  description?: string;
  isDeleted: boolean;
  createdAt?: Date;
}
