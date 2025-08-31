import jwt from "jsonwebtoken";
import { config } from "../config/env-config.js";

const generateTokenAndCookie = (userId, res) => {
  const token = jwt.sign(userId, config.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    maxAge: 10 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateTokenAndCookie;
