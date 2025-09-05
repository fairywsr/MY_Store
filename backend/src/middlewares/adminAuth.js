import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyAdminJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.adminToken; // read from cookie

    if (!token) {
      throw new ApiError(401, "Unauthorized: Admin token missing");
    }

    // verify token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // attach decoded info to request
    req.admin = decoded;

    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized: Invalid or expired admin token");
  }
});
