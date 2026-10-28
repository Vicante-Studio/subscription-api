import 'dotenv/config'
import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt, { type SignOptions } from 'jsonwebtoken'
import type { AppError } from '../types/error.types.js';
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env

if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new Error('Please define JWT_SECRET and JWT_EXPIRES_IN in .env');
}


export const handleSignUp = async (req: Request, res:Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  session.startTransaction()

  try {
    // Logic to create a new user
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      const error: AppError = new Error('User already exists')
      error.statusCode = 409;
      throw error;
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const [newUser] = await User.create([{ name, email, password: hashedPassword }], { session });

    if (!newUser) {
      throw new Error('Failed to create user');
    }

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as NonNullable<SignOptions['expiresIn']> })

    await session.commitTransaction();
    session.endSession();

    const { password: _password, ...user } = newUser.toObject()
    
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: {
      token,
      user
    }
  })
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