import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { ConnectDB } from "./config/database.js"
import mainRouter from "./mainRouter.js"

dotenv.config()
ConnectDB()

const app=express()
app.use(cors())
app.use(express.json())
app.use("/",mainRouter)

app.listen(process.env.PORT, ()=>{
    console.log("DB connected");
    
})