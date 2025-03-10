import express from 'express'
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.json({limit:"16kb"}))
app.use(cookieParser())

import userRoutes from './routes/user.routes.js';
import hackathonRoutes from './routes/hackathonOrganizer.routes.js'

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/hackathon/organizer",hackathonRoutes)

//app.use("api/v1/hackathon/participants")
export{app}
