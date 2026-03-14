import expressAsyncHandler from "express-async-handler";
import User from "../models/user-model";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return next(createHttpError.BadRequest("All fields are required"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createHttpError.Conflict("User already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    data: newUser,
    message: "User created successfully",
  });
});

export const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return next(createHttpError.Conflict("User not found"));
  }

  const hashedPassword = await bcrypt.compare(
    password,
    existingUser?.password as string,
  );

  if (!hashedPassword) {
    next(createHttpError.Conflict("invalid password"));
  }

  const token = jwt.sign(
    { id: existingUser._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );
  res.cookie("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "User login successfully",
  });
});
