import express from "express"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(cookieParser())


import { userRoute } from "../routes/userRouter.js"

app.use("/", userRoute)




export {app}