import type { NextFunction, Request, Response } from "express";

interface AppError extends Error {
  statusCode?: number;
  code?: number; // Mongo duplicate key (11000)
  errors?: Record<string, { message: string }>; // Mongoose validation errors
}

const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  try {
    let error = { ...err };
    error.message = err.message;

    console.error(err)
    
    // Mongoose bad ObjectId
    if (err.name === 'CastError'){
      const message = 'Resource not found';
      error = new Error(message);
      error.statusCode = 404;
    };

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = 'Duplicate field value entered';
      error = new Error(message);
      error.statusCode = 400
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors ?? {}).map(val => val.message);
      error = new Error(message.join(', '));
      error.statusCode = 400
    }
    
    res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error'})
  } catch (error) {
    next(error);
  }
}

export default errorMiddleware