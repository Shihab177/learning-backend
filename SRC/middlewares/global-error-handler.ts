import type { NextFunction, Request,Response } from "express";
import type { HttpError } from "http-errors";


export default function globalErrorHandler(err:HttpError,req:Request,res:Response,next:NextFunction) {
    const message = err.message || "internal server error"
    const statusCode = err.statusCode || 500
  return res.status(statusCode).json({
    success : false,
    message: message,
    errorStack :  process.env.NODE_ENV === "development" ? err.stack : undefined
  })
}
