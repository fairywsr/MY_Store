import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken"
import validator from "validator";
import { ApiResponse } from "../utils/apiResponse.js";

// # function to generate Access and refresh Token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generate access & refresh Token"
    );
  }
};

// ! register User Controller
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(404, "All fields are required");
  }

  //    check if user is already exist
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exist");
  }

  if (!validator.isEmail(email)) {
    throw new ApiError(402, "please Enter valid email");
  }

  if (password.length < 4) {
    throw new ApiError(402, "Please enter a strong Password");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  //  const token = user.generateToken();
  // console.log(`user: ${user}, Token: ${token}`);
 return res
    .status(200)
    // .cookie("Token", token, options)
    .json(new ApiResponse(200, { user }, "User created successfully"));
});

// ! Login controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "user not found");
  }

  const inCorrectPasword = await user.isPasswordCorrect(password);

  if (!inCorrectPasword) {
    throw new ApiError(400, "invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict", 
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user }, "User Login successfully"));
});

// ! logout controller
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "userlogout Successfully"));
});

// ! accessToken generater controller
const accessTokenGenerate = asyncHandler(async (req, res) => {
  const inCommingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
    
  if (!inCommingRefreshToken) {
    throw new ApiError(402, "UnAuthorized Request");
  }

  try {
    const decodeToken = jwt.verify(inCommingRefreshToken, 
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodeToken?._id);

    if (!user) {
      throw new ApiError(401, "invalid refresh Token");
    }

    if (inCommingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh Token is expired");
    }

    const options = {
      httpOnly: true,
      secure: false,
    };

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user._id);
      await user.save()

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid RefreshToken");
  }
});

// ! accessToken is-auth controller
 const isAuth = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});


export { registerUser, loginUser, logoutUser, accessTokenGenerate, isAuth };
