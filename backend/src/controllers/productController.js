import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Product} from "../models/productModel.js"
import connectCloudinary from "../config/cloudinary.js"
//! Controller for add product
const cloudinary = connectCloudinary(); 
const addProduct = asyncHandler(async(req, res)=>{
    const productData = JSON.parse(req.body.productData)

    const images = req.files

    let imageUrl = await Promise.all(images.map(async (item)=>{
        let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"})
        return result.secure_url
    }))

    
    await Product.create({...productData, image:imageUrl})

    return res.status(200).json(new ApiResponse(200, {productData}, "images upload successfully"))
})

//! Controller for list product
const listProduct = asyncHandler(async(req, res)=>{
    const products = await Product.find({})

    return res.status(200).json( new ApiResponse(200, products, "All products fetch from database successfully"))
})

//! Controller for single product detail
const singleProductDetails = asyncHandler(async(req, res)=>{
    const {productId} = req.body
    const product = await Product.findById(productId)

    return res.status(200).json(new ApiResponse(200, {product}, "product fetch successfully"))
})

//! Controller for change stock
const changeStock = asyncHandler(async(req, res)=>{
    const {productId, inStock} = req.body
    await Product.findByIdAndUpdate(productId, {inStock})

    res.status(200).json(new ApiResponse(200, {}, "stock updated"))

})


export {addProduct, listProduct, singleProductDetails, changeStock}