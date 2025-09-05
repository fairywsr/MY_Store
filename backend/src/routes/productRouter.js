import {Router} from "express"
import { upload } from "../middlewares/multer.js";
import { addProduct, changeStock, listProduct, singleProductDetails } from "../controllers/productController.js";
import { verifyAdminJWT } from "../middlewares/adminAuth.js";

const productRouter = Router()

productRouter.post("/add", upload.array(['images']), verifyAdminJWT, addProduct)
productRouter.get("/list", listProduct)
productRouter.post("/single", singleProductDetails)
productRouter.post('/stock', changeStock)

export default productRouter;