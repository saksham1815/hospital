import express from "express";
import cors from "cors";

import 'dotenv/config'
import { connectDB } from "./config/connectDB.js";
import hospitalRouter from "./routes/hospitalRoutes.js";

const allowedOrigins = [
    'https://medcare-orpin.vercel.app',
    'https://hospital-management-nine-wheat.vercel.app',
    'http://localhost:5173',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) { // !origin allows requests from non-browser clients (like Postman)
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
};

const app=express();
app.use(express.json());
app.use(cors(corsOptions))


app.use(express.json());

// connect database
connectDB();

app.use('/get',hospitalRouter);
app.get('/',(req,res)=>{
    res.send("Hello ji aagye")
})

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server connected at ${PORT}`);
})
