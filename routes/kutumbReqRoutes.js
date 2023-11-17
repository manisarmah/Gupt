import express from "express";
const router = express.Router();
import { acceptReq, finaliseReq } from "../controllers/acceptReqController.js";
import { rejectReq } from "../controllers/rejectReqController.js";
import { sendRequest } from "../controllers/sendRequest.js";
//Send request route
router.post("/sendRequest", sendRequest);
//Accept route
router.post("/accept", acceptReq);

//Reject route
router.post("/reject", rejectReq);

router.post("/finalise", finaliseReq);
export { router as kutumbReqRoutes };
