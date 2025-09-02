import jwt from "jsonwebtoken";

import User from "../models/user-model.js";
import { config } from "../config/env-config.js";
import client from "../config/redis-config.js";

const prtotectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access - No Token Provided",
        data: {},
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access: Invalid or Expired Token",
        data: {},
      });
    }

    let cachedUser = await client.get(`user:${decoded.userId}`);

    if (cachedUser) {
      req.user = JSON.parse(cachedUser);
      return next();
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
        data: {},
      });
    }

    await client.setEx(`user:${user._id}`, 60 * 60, JSON.stringify(user));

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Protect Route Middleware:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

export default prtotectRoute;
