import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";


export const handleSignUp = async (req: Request, res:Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction()

  try {
    // Logic to create a new user

    
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
}

export const handleSignIn = async (req: Request, res:Response, next: NextFunction) => {
  
}

export const handleSignOut = async (req: Request, res:Response, next: NextFunction) => {
  
}