import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
    role:{type:String, enum:['admin','user'],default:'user'}
})

export const userModel = mongoose.model("User",userSchema)