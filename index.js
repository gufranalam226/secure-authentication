import connectDB from "./db/index.js";
import app from "./app.js";
import dotenv from "dotenv"


dotenv.config({
    path : "./env"
})




connectDB()
.then(()=>{
    const PORT = process.env.PORT;
    app.listen(PORT, ()=>{
        console.log("Server is running on port no :", PORT)
    })
    app.on("error", (error)=>{
        throw error
    })
})