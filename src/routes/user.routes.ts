import { Router } from 'express';

const userRouter = Router()


userRouter.get('/', (req, res) => res.send({data: 'data'}))
userRouter.get('/name', (req, res) => res.send({name: "Victory"}))
userRouter.get('/age', (req, res) => res.send({age: "22"}))
userRouter.get('/role', (req, res) => res.send({role: "Software Engineer"}))

export default userRouter;