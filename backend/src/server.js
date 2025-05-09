import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js"

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT ;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true //allowing frontend to send cookies
}))
app.use(express.json());
app.use(cookieParser()) ;

app.use("/api/auth" , authRouter) ;
app.use("/api/users" , userRouter) ;
app.use("/api/chat" , chatRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});
