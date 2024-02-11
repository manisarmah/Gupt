import express from "express";
import {registerUser, loginUser} from "../controllers/authController.js"
import {
  sendRequest,
  //   getEncryptedKey,
} from "../controllers/sendRequest.js";
const router = express.Router();

// User Registration Route
router.post("/register", registerUser);
router.post("/sendRequest", sendRequest);

// User Login Route
router.post("/login", loginUser);

// router.get("/get", getEncryptedKey);
export { router as sksRoutes };
