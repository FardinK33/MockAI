import jwt from "jsonwebtoken";
import { config } from "../config/env-config.js";

const generateTokenAndCookie = (userId, res) => {
  try {
    const token = jwt.sign(userId, config.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.cookie("jwt", token, {
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  } catch (err) {
    console.error("Token generation failed:", err);
    throw new Error("Internal authentication error");
  }
};

export default generateTokenAndCookie;
