import { model, Schema, Types, type Document } from "mongoose";

interface IBook extends Document {
  userId: Types.ObjectId;
  title: string;
  description: string;
}

const userSchema = new Schema<IBook>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Book = model<IBook>("Book", userSchema);
export default Book;
