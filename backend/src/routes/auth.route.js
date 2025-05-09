import express from "express";
import { signup } from "../controllers/auth.controllers.js";
import { login } from "../controllers/auth.controllers.js";
import { logout } from "../controllers/auth.controllers.js";
import { onboard } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup" , signup);
authRouter.post("/login" , login);
authRouter.post("/logout" , logout);

authRouter.post("/onboarding" , protectRoute ,onboard);

//  check if user is logged in
authRouter.get("/me" , protectRoute , (req,res) => {
    res.status(200).json({
        success: true ,
        user: req.user
    })
})

export default authRouter ;
