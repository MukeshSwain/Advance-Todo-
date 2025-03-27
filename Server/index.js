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
import path from 'path'

const port = process.env.PORT || 3000;

const app = express();
const __dirname = path.resolve();
app.use(cookieParser());

app.use(express.json())


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

connectDB();

app.use("/api/user", userRoutes)
app.use("/api/task", taskRoutes)

if (process.env.NODE_ENV === "production") {
    {
        app.use(express.static(path.join(__dirname, "..Front-end/dist")));
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "../Front-end", "dist", "index.html"));
        });
        
    }
}
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
})







