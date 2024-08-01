import mongoose from "mongoose"
import dotenv from "dotenv"




dotenv.config({
    path : "./.env"
})


const MONGODB_URI = process.env.MONGODB_URI


const connectDB = async ()=>{
    try{
        await mongoose.connect(`${MONGODB_URI}`)
        .then(()=>{
            console.log("DataBase connected successfully...")
        })
        
    }catch(err){
        console.log("Error in connectin with DataBase : ", err)
        throw err
    }
}

export default connectDB