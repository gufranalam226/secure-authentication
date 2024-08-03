import {app} from "./app.js"
import {connectDB} from "../db/index.js"
import {apiErrorHandler} from "./apiErrorHandler.js"
import dotenv from "dotenv"

dotenv.config({
    path : "./.env"
})


const PORT = process.env.PORT || 8000
connectDB()
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port no. ${PORT}`)

    })
    app.on("error", (error)=>{
        throw error
    })
}).catch((error)=>{
    console.log(error)
    throw new apiErrorHandler(401, "Error in srarting server")    
})