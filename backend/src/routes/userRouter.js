import {Router} from "express";
import { accessTokenGenerate, loginUser, logoutUser, registerUser, isAuth } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);

// ✅ ye sahi hai
userRouter.route("/is-auth").post(verifyJWT, isAuth);

// refresh token generate karna ho to alag route
userRouter.route("/refresh-token").post(accessTokenGenerate);

export default userRouter;
