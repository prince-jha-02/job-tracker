import express from 'express'
import cors from  'cors'
// import 'dotenv/config'
import dotenv from "dotenv";
import connectDB from './config/db.js';
import userRouter from './routes/authRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on ${process.env.PORT}`
  );
});