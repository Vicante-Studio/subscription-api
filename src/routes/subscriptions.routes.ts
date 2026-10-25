import { Router } from 'express';
import { testData } from '../../server.js';

const subscriptionRouter = Router()


subscriptionRouter.get('/', (req, res) => res.send({data: testData}))

export default subscriptionRouter;