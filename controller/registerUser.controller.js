import {apiErrorHandler} from "../src/apiErrorHandler.js"
import {User}  from "../schema/user.schema.js"
import { apiResponse } from "../src/apiResponse.js"
import {asyncHandler} from "../src/asyncHandler.js"
import bcrypt from "bcrypt"

const registerUser = asyncHandler(async(req, res)=>{
    const {fullname, username, gender, phoneNumber, email, password, cnfpassword} = req.body

    if(!(username && phoneNumber && email )){
        throw new apiErrorHandler(201, "all fields are required")
    }
    const checkUser =  await User.findOne({
        $or: [{username}, {email}, {phoneNumber}]
    })
    if(checkUser){
        throw new apiErrorHandler(201, "User already registered")
    }

    if(password !== cnfpassword){
        throw new apiErrorHandler(201, "Password must be same")
    }

    const hashPassword = await bcrypt.hash(password, 10)


    const user = await User.create({
        fullname,
        username,
        gender,
        phoneNumber,
        email, 
        password : hashPassword
    })
    user.save()

    const userInfo = await User.findById(user._id).select("fullname")
    
    return res.status(200).render("../views/register.ejs", {userInfo})
})

export {registerUser}