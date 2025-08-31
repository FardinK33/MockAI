import bcrypt from "bcryptjs";

import User from "../models/user-model.js";
import generateTokenAndCookie from "../utils/token-cookies-generator.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        data: {},
      });
    }

    if (confirmPassword !== password) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
        data: {},
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
        data: {},
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName: name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndCookie({ userId: newUser._id }, res);

      return res.status(201).json({
        success: true,
        message: "User Created Successfully",
        data: {
          name: newUser.fullName,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        data: {},
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        return res.status(401).json({
          success: false,
          message: "Invalid User Credentials",
          data: {},
        });
      }

      generateTokenAndCookie({ userId: user._id }, res);

      return res.status(200).json({
        success: true,
        message: "User Logged in Successfully",
        data: {
          name: user.fullName,
          email: user.email,
        },
      });
    } else {
      res.status(401).json({
        success: false,
        message: "User not found : Please Sign Up",
        data: {},
      });
    }
  } catch (error) {
    console.log("Error in login controller:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      success: true,
      message: "Successfully Logged Out",
      data: {},
    });
  } catch (error) {
    console.log("Error at logout controller", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: {},
    });
  }
};
