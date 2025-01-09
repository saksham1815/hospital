import express from "express";

import 'dotenv/config'
import { connectDB } from "./config/connectDB.js";
import hospitalRouter from "./routes/hospitalRoutes.js";


const app=express();


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