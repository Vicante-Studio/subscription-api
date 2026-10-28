import 'dotenv/config'; // must be first
import express from 'express';
import cors, {type CorsOptions} from 'cors';
import userRouter from './src/routes/user.routes.js';
import subscriptionRouter from './src/routes/subscriptions.routes.js';
import authRouter from './src/routes/auth.route.js';
import connectToDatabase from './database/mongodb.js';

const app = express();

const allowedOrigins = [
  'https://hoppscotch.io', // Hoppscotch web app
];

const PORT = Number(process.env.PORT) || 4000;

export const testData = {
  name: "Batubo Victory",
  age: 22,
  role: "Software Engineer",
  school: "NOUN"
};

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false); // rejects cleanly instead of throwing a 500
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // after cors, before routes

app.get('/', (req, res) => {
  res.send(testData);
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.listen(PORT, async() => {
  console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;