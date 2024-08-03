import { asyncHandler } from "../src/asyncHandler.js";
import { User } from "../schema/user.schema.js";
import { apiErrorHandler } from "../src/apiErrorHandler.js";
import { apiResponse } from "../src/apiResponse.js";
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser";


const generateToken = async (userId)=>{
    try {
        console.log(userId)
        
        const findUser = await User.findOne(userId)
        const accessToken = await findUser.generateAccessToken()
        const refreshToken = await findUser.generateRefreshToken()
        await findUser.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    } catch (error) {
        throw new apiErrorHandler(201, "Something went wrong while generating tokens")
    }
}

const loginUser = asyncHandler(async(req, res)=>{
    const {loginId, password} = req.body
    if(!loginId){
        throw new apiErrorHandler(201, "Username, email or phone number is required")
    }

    const userFind = await User.findOne({
        $or :[{username: loginId}, {email: loginId}, {phoneNumber: loginId}]
    })
    if(!userFind){
        throw new apiErrorHandler(201, "Unauthorized access, user not found");
    }

    const authPassword = await bcrypt.compare(password, userFind.password)
    if(!authPassword){
        throw new apiErrorHandler(201, "Unauthorized access, invalid credential")
    }
    const userInfo = await  User.findById(userFind._id).select("-password -_id -__v")


    const {accessToken, refreshToken} = await generateToken(userFind._id)
    const options ={
        http : true,
        secure : true
    }

    
    
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .render("../views/login.ejs", {userInfo})

})

export {loginUser}