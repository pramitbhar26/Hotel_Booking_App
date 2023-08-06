 import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import cookieParser from "cookie-parser";
import cors from "cors";
 const app = express()
dotenv.config();

const connect = async () =>{
    try{
       await mongoose.connect(process.env.MONGO);
       console.log("Connected to mongoDB.");
    }catch(err){
        throw err;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected!")
})
mongoose.connection.on("connected",()=>{
    console.log("mongoDB connected!")
})
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/hotels",hotelsRoute);

app.use((err,req,res,next)=>{
    const errStatus = err.status || 500;
    const errMessage = err.message || "Something went Wrong";
    return res.status(errStatus).json({
        success: false,
        status : errStatus,
        message : errMessage,
        stack : err.stack,
    });
});


 app.listen(8800,()=>{
    connect()
    console.log("Connected to backend!")
 })
