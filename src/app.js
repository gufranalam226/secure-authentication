import express from "express"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import { userRoute } from "../routes/userRouter.js"
import session from "express-session"
import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})


const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(cookieParser())
// app.set('trust proxy' ,1)
app.use(session({
    secret: process.env.SESSION_SECRET,
 
}))


app.use("/", userRoute)




export {app}