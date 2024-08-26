import { Request, Response, NextFunction } from "express";
import { AppError } from "../../application/errors/appError";

export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    const statusCode = err.statusCode;
    const message = err.message;
    const errorResponse = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    };

    res.status(statusCode).json(errorResponse);
  } else next();
};
