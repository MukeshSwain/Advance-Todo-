import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './util/db.js';
//routes
import userRoutes from './routes/user.route.js';
import taskRoutes from './routes/task.route.js';

import "./util/nodeCron.js";

const port = process.env.PORT || 3000;
const app = express();


const allowedOrigins = ["https://advance-todo-eight.vercel.app"];


app.use(cors({
  origin: allowedOrigins[0], 
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins[0]);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

app.use(express.json());
app.use(cookieParser());


app.use((req, res, next) => {
  console.log("Cookies Received:", req.cookies);
  next();
});


connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
