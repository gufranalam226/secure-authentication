import mongoose from "mongoose";
import dotenv from "dotenv"
import { apiErrorHandler } from "../src/apiErrorHandler.js";

dotenv.config({
    path : "./.env"
})

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${MONGODB_URI}`)
        .then(()=>{
            console.log("DataBase connected successfully!")
        })
    } catch (error) {
        throw new apiErrorHandler(401, "Error while connecting with the database")
    }
}

export {connectDB}