import {Router} from "express"
import { allOrders, orderStatus, placeOrderCOD, placeOrderStripe, userOrders } from "../controllers/orderController.js"
import { verifyJWT } from "../middlewares/authMiddleware.js"
import { verifyAdminJWT } from "../middlewares/adminAuth.js"


const orderRouter = Router()

orderRouter.post("/list", verifyAdminJWT, allOrders)  
orderRouter.post("/status",verifyAdminJWT, orderStatus)
//  payment
orderRouter.post('/cod', verifyJWT, placeOrderCOD)
orderRouter.post('/stripe', verifyJWT, placeOrderStripe)
// userOrders 
orderRouter.post("/userorders", verifyJWT, userOrders)


export default orderRouter