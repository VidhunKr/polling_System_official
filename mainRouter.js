import express from "express"
import { login, register } from "./controller/authController.js"
import { createPoll, votePoll } from "./controller/PollController.js"
import { protect } from "./config/middleware/authMiddleware.js"
import { authorize } from "./config/middleware/roleMiddleware.js"
const mainRouter = express.Router()

//Auth
mainRouter.post("/register",register)
mainRouter.post("/login",login)

//Poll
mainRouter.post("/createPoll", protect, authorize(['admin']),createPoll)
mainRouter.patch("/:id/vote/:index",protect ,votePoll)



export default mainRouter