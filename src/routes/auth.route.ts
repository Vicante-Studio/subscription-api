import { Router } from 'express';
import { handleSignIn, handleSignUp, handleSignOut } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/sign-up', handleSignIn)
authRouter.post('/sign-in', handleSignUp)
authRouter.post('/sign-out', handleSignOut)

export default authRouter