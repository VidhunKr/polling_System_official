import mongoose from "mongoose";

export const ConnectDB = async ()=>{
    try{
        await
        mongoose.connect(process.env.connection_String)
    }catch(err){
        console.error(err.message)
        process.exit(1)
    }
}