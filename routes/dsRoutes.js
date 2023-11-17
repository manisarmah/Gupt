import express from "express";
import { receiveMessage, sendMessage } from "../controllers/dsController.js";
const router = express.Router();
//Send request route
router.post("/sendMessage", sendMessage);
router.post("/receiveMessage", receiveMessage);
export { router as dsRoutes };
