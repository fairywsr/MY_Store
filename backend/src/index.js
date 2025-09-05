import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRouter.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRouter.js";
import adminRouter from "./routes/adminRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";
import { stripeWebhooks } from "./controllers/orderController.js";

dotenv.config()
const app = express(); 
const port = process.env.PORT || 4000

// middleware setup 
app.use(express.json()) // jason request body parsing 
app.use(cookieParser()) //cookie-parser middleware to parse http request cookies

connectDB(); // for database connection
connectCloudinary()  // for image storage

app.use('/stripe', express.raw({type: 'application/json'}), stripeWebhooks) // verified stripe payments

app.use(cors({
    origin: ['http://localhost:5173', 'https://my-store-frontend-gold.vercel.app'],  //whitelist of all allowed domains
    credentials: true, // Required for cookies/authorization header
}))
// Root end point to check api status
app.get("/", (req, res)=>{
    res.send("Api is successfull connected")
})



// user routes
app.use("/api/user", userRouter)
app.use("/api/admin",adminRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

  
app.listen(port, ()=>{
    console.log(`App is running on port http://localhost:${port}`)
})
