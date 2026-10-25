import dotenv from 'dotenv';
import express from 'express'

dotenv.config();

const app = express();

const PORT = Number(process.env.port) || 6000;

const testData = {
  name: "Batubo Victory",
  age: 22,
  role: "Software Engineer",
  school: "NOUN"
}

app.get('/', (req, res) => {
  res.send(testData)
});

app.listen(PORT, () => {
  console.log(`Subscription Tracker API is running on http://localhost:${PORT}`)
})

export default app

