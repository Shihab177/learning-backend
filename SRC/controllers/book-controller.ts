import expressAsyncHandler from "express-async-handler";
import User from "../models/user-model";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Book from "../models/book-model";

export const createBook = expressAsyncHandler(async (req, res, next) => {
  const { title, description } = req.body || {};

  const newPost = await Book.create({
    userId: req?.user?.id,
    title,
    description,
  });

  res.status(201).json({
    success: true,
    data: newPost,
    message: "book created successfully",
  });
});

export const getAllBook = expressAsyncHandler(async (req, res, next) => {
  const id = req?.user?.id;

  const allBook = await Book.find({ userId: id });
  if (allBook.length === 0) {
    return next(createHttpError.Conflict("books not found"));
  }

  res.status(201).json({
    success: true,
    data: allBook,
    message: "get all books successfully",
  });
});
export const getSingleBook = expressAsyncHandler(async (req, res, next) => {
  const userId = req?.user?.id;
  const bookId = req.params.id;
  const book = await Book.findById(bookId);

  if (!book) {
    return next(createHttpError.NotFound("book not found"));
  }
  if (book.userId.toString() !== userId) {
    return next(
      createHttpError.Forbidden("you are not allowed to access this book"),
    );
  }
  res.status(201).json({
    success: true,
    data: book,
    message: "get single books successfully",
  });
});
export const updateBook = expressAsyncHandler(async (req, res, next) => {
  const userId = req?.user?.id;
  const bookId = req.params.id;
  const book = await Book.findById(bookId);

  if (!book) {
    return next(createHttpError.NotFound("book not found"));
  }
  if (book.userId.toString() !== userId) {
    return next(
      createHttpError.Forbidden("you are not allowed to access this book"),
    );
  }
  const updatedBook = await Book.findByIdAndUpdate(
    bookId,
    { $set: req.body },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
  res.status(201).json({
    success: true,
    data: updatedBook,
    message: "books update successfully",
  });
});
