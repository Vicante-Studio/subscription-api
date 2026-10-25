import { Router } from 'express';
import { testData } from '../../server.js';

const userRouter = Router()


userRouter.get('/', (req, res) => res.send({data: testData}))
userRouter.get('/name', (req, res) => res.send({name: "Victory"}))
userRouter.get('/age', (req, res) => res.send({age: "22"}))
userRouter.get('/role', (req, res) => res.send({role: "Software Engineer"}))

export default userRouter;