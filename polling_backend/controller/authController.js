import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userModel } from "../models/userModel.js"


export const register = async (req,res)=>{
    const {email, name, password, role}=req.body
    const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: 'already have acc' });
  }
    const hashed= await bcrypt.hash(password,10)
    const user = new userModel({name, email, password:hashed, role})
    await user.save()
    res.status(200).json({ msg: "User registered" })
    console.log("users_list", user);
    
}


export const login = async (req,res)=>{
    const {email, password,}=req.body
    const user= await userModel.findOne({email:email})
    if(!user || !(await bcrypt.compare(password, user.password)))
        return res.status(400).json({msg:"Invalid User"})
      console.log(user);
      

    const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
    res.json({token})
    console.log("token: ",token);
    
}

