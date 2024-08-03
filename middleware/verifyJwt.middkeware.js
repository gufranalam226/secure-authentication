import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../src/asyncHandler.js";
import { apiErrorHandler } from "../src/apiErrorHandler.js";
import { User } from "../schema/user.schema.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const verifyJwt = asyncHandler(async(req, res)=>{
    try {
        const token = req.cookie?.accessToken
        if(!token){
            throw new apiErrorHandler(201, "Unauthorized access")
        }
        const decodeToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodeToken)
        const user = await User.findById(decodeToken?._id)
        if(!user){
            throw new apiErrorHandler(201, "Unauthorized access")
        }
        req.user = user
        next()
    } catch (error) {
        throw new apiErrorHandler(400, "something went wrong while veriging token")
    }
})

export  {verifyJwt}