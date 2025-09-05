import {Router} from "express"
import { addCart, UpdateCart } from "../controllers/cartController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const cartRouter = Router();

cartRouter.post("/add", verifyJWT, addCart)
cartRouter.post("/update", UpdateCart)


export default cartRouter;