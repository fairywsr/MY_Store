import { User } from "../models/userModel.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
const addCart = asyncHandler(async (req, res) => {
  const { itemId, size } = req.body;
  const userId = req.user._id;
  console.log(userId)
  const userData = await User.findById(userId);

  if (!userData) {
    throw new ApiError(404, "User not found");
  }

  let cartData = userData.cartData || {};

  if (cartData[itemId]) {
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;  // ✅ fixed typo
    }
  } else {
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
  }

  await User.findByIdAndUpdate(userId, { cartData });

  return res
    .status(200)
    .json(new ApiResponse(200, { cartData }, "Added to cart successfully"));
});


// cart Update controller
const UpdateCart = asyncHandler(async (req, res)=>{
    const {itemId, size, quantity} = req.body
    const userId = req.userId

    const userData = await User.findById(userId)
    const cartData = userData.cartData

    cartData[itemId][size] = quantity
    await userData.findByIdAndUpdate(userId, {cartData})

    return res.status(200).json(new ApiResponse(200, {}, "cart updated successfully"))

})

export{addCart, UpdateCart}