import mongoose from "mongoose"
import Jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true,
        value: ["male", "female"]
    },
    accessToken:{
        type: String
    }
}, {timestamps: true})


userSchema.methods.generateAccessToken = async function (){
    return await Jwt.sign({
        _id: this._id
    },
    process.env.ACCESS_TOKEN_SECRET ,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}


// userSchema.methods.generateAccessTocken = async function(){
//     return Jwt.sign({
//         _id: this._id,
//         email: this.email,
//         username: this.username,
//         fullname: this.fullname
//     },     
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//         expiresIn : process.env.ACCESS_TOKEN_EXPIRY
//     })
// }



userSchema.methods.generateRefreshToken = async function(){
    return await Jwt.sign({
        _id : this._id
    },
    process.env.refresh_secret,
    {
        expiresIn: process.env.refresh_expire
    })
}

export const User = mongoose.model("User", userSchema)