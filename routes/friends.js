import express from "express";
// import getPendingKutumbsForUser from "../controllers/getAllPending.js";
import {
  getAllFriends,
  getYetToFinaliseDetails,
} from "../controllers/getAllFriends.js";
import { incomingFR } from "../controllers/incomingFR.js";
const router = express.Router();
router.post("/friends", getAllFriends);
router.get("/incomingFriendReq/:id", incomingFR);
router.get("/getYetToFinaliseDetails/:id", getYetToFinaliseDetails);
export { router as friendRoutes };
