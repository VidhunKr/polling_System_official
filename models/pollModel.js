import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
    title:String,
    options:[String],
    votes:[Number],
    visibility:{type:String, enum:['public', 'private'], default:'public'},
    userAllowed:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    expiresAt:Date,
    createdAt:{type:Date, default:Date.now}

})

export const pollModel = mongoose.model("Poll",pollSchema)