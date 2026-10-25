import dotenv from 'dotenv';
import express from 'express'
import userRouter from './src/routes/user.routes.js';
import subscriptionRouter from './src/routes/subscriptions.routes.js';
import authRouter from './src/routes/auth.route.js';

dotenv.config();

const app = express();

const PORT = Number(process.env.port) || 6000;

export const testData = {
  name: "Batubo Victory",
  age: 22,
  role: "Software Engineer",
  school: "NOUN"
}

app.get('/', (req, res) => {
  res.send(testData)
});

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)

app.listen(PORT, () => {
  console.log(`Subscription Tracker API is running on http://localhost:${PORT}`)
})

export default app

