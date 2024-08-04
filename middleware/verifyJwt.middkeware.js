import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../src/asyncHandler.js";
import { apiErrorHandler } from "../src/apiErrorHandler.js";
import { User } from "../schema/user.schema.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const verifyJwt = asyncHandler(async(req, res, next)=>{
    const token = req.cookies?.accessToken
    if(!token){
        throw new apiErrorHandler(201, "Unauthorized access")
    }
    const decodeToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodeToken?._id)
    if(!user){
        throw new apiErrorHandler(201, "Unauthorized access")
    }
    req.user = user
    next()
    
})

export  {verifyJwt}