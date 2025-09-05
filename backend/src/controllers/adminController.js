import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const options = {
  httpOnly: true,
  secure: true, // make sure to use true only in production (https)
};

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { email },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("adminToken", token, {
      ...options,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json(
      new ApiResponse(200, {}, "Admin login successfully")
    );
  } else {
    // ❌ Invalid credentials
    throw new ApiError(401, "Invalid admin email or password");
  }
});

const adminLogout = asyncHandler(async (req, res) => {
  // Clear cookie
  res.clearCookie("adminToken", options);

  return res.status(200).json(
    new ApiResponse(200, {}, "Admin logged out successfully")
  );
});
 const isAuth = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.admin,
  });
});
export { adminLogin, adminLogout, isAuth };
