import express from "express";
import {
  sendRequest,
  //   getEncryptedKey,
} from "../controllers/sendRequest.js";
const router = express.Router();

// User Registration Route
router.post("/sendRequest", sendRequest);

// User Login Route
// router.get("/get", getEncryptedKey);
export { router as sksRoutes };
