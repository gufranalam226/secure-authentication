import express from "express"

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set("view engine", "ejs")


import { userRouter } from "./routes/userRouter.js";
app.use("/", userRouter)


export default app