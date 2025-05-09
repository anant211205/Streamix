import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers } from "../controllers/user.contollers.js";
import { getMyFriends } from "../controllers/user.contollers.js";
import { sendFriendRequest } from "../controllers/user.contollers.js";
import { acceptFriendRequest } from "../controllers/user.contollers.js";
import { getFriendRequests } from "../controllers/user.contollers.js";
import { getOutgoingFriendReqs } from "../controllers/user.contollers.js";

const userRouter = express.Router() ;

//apply auth middleware to all routes
userRouter.use(protectRoute)

userRouter.get("/",getRecommendedUsers) 
userRouter.get("/friends",getMyFriends)

userRouter.post("/friend-request/:id" , sendFriendRequest)
userRouter.put("/friend-request/:id/accept" , acceptFriendRequest)

userRouter.get("/friend-requests" , getFriendRequests)
userRouter.get("/outgoing-friend-requests" , getOutgoingFriendReqs)

export default userRouter ;