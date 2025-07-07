import express from "express"
import { login, register } from "./controller/authController.js"
import { createPoll, deletePoll, editPoll, getPoll, votePoll } from "./controller/PollController.js"
import { protect } from "./config/middleware/authMiddleware.js"
import { authorize, isAdmin, isUser } from "./config/middleware/roleMiddleware.js"
const mainRouter = express.Router()

//Auth
mainRouter.post("/register",register)
mainRouter.post("/login",login)

//Poll
mainRouter.post("/createPoll", protect,createPoll)
mainRouter.patch("/:id/vote/:index",protect,votePoll)
mainRouter.get("/get",getPoll)
mainRouter.post("/editPoll/:id",editPoll)
mainRouter.delete("/delete/:id",deletePoll)



export default mainRouter