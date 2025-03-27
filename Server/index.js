import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './util/db.js';
//routes
import userRoutes from './routes/user.route.js'
import taskRoutes from './routes/task.route.js'

import "./util/nodeCron.js"

const port = process.env.PORT || 3000;
const app = express();

const allowedOrigins = ["https://advance-todo-eight.vercel.app"]; // ✅ Removed trailing slash

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
connectDB();

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
