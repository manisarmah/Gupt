import User from "../model/user.js";
import { userGen } from "../utils/userGen.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  const { userId, password, secretCode, domain } = req.body;

  try {
    const existingUser = await User.findOne({ userId });

    if (existingUser) {
      return res
        .status(400)
        .json({ status: "Fail", message: "User ID already exists" });
    }

    const userDoc = await userGen(userId, password, secretCode, domain);
    console.log(userDoc);
    const finalSW1 = userDoc[0];
    const finalSW2 = userDoc[1];
    const newUser = new User({ userId, finalSW1, finalSW2 });
    await newUser.save();
    res
      .status(201)
      .json({ status: "Success", message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Fail", message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { userId, password, secretCode, domain } = req.body;

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res
        .status(401)
        .json({ status: "Fail", message: "Please register first!" });
    }
    const userDoc = await userGen(userId, password, secretCode, domain);
    const finalSW1 = userDoc[2];
    const finalSW2 = userDoc[3];
    const isPasswordValid = await argon2.verify(user.finalSW1, finalSW1);
    const isSecretCodeValid = await argon2.verify(user.finalSW2, finalSW2);

    if (!isPasswordValid || !isSecretCodeValid) {
      return res.status(401).json({
        status: "Fail",
        message: "Invalid User ID, password, or secret code",
      });
    }
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("authToken", token, { httpOnly: true });
    res
      .status(200)
      .json({ status: "Success", message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Fail", message: "Internal server error" });
  }
};

export const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    // console.log(token);
    const isAjaxRequest = req.headers["x-requested-by"] === "YourFrontendApp";

    if (!token) {
      if (isAjaxRequest) {
        return res.status(403).json({
          isLoggedIn: false,
          status: "Fail",
          message: "No token provided",
        });
      } else {
        return res
          .status(403)
          .json({ status: "Fail", message: "No token provided" });
      }
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (isAjaxRequest) {
          return res.status(401).json({
            status: "Fail",
            isLoggedIn: false,
            message: "Failed to authenticate token",
          });
        } else {
          return res
            .status(401)
            .json({ status: "Fail", message: "Failed to authenticate token" });
        }
      }

      if (isAjaxRequest) {
        return res
          .status(200)
          .json({ status: "Success", isLoggedIn: true, data: decoded });
      }

      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    res.status(500).json({ status: "Fail", message: "Internal server error" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("authToken", { httpOnly: true });
    console.log("cleared");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
