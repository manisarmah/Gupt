import express from "express";
import {
  registerUser,
  loginUser,
  authenticateToken,
  logoutUser,
} from "../controllers/authController.js";
import getAllLoggedInUserIds from "../controllers/getAllUsers.js";
// import {
//   sendRequest,
//   //   getEncryptedKey,
// } from "../controllers/sendRequest.js";
const router = express.Router();

// User Registration Route
router.post("/register", registerUser);
// router.post("/sendRequest", sendRequest);

// User Login Route
router.post("/login", loginUser);

router.get("/verifyAuth", authenticateToken);

router.get("/allUsers", getAllLoggedInUserIds);

router.post("/logout", logoutUser);
// router.get("/get", getEncryptedKey);
export { router as sksRoutes };
