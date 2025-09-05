import { Router } from "express";
import { adminLogin, adminLogout, isAuth } from "../controllers/adminController.js";
import { verifyAdminJWT } from "../middlewares/adminAuth.js";

const adminRouter = Router()

adminRouter.post("/login", adminLogin)
adminRouter.post("/logout", verifyAdminJWT, adminLogout)
adminRouter.route("/is-auth").post(verifyAdminJWT, isAuth);


export default adminRouter