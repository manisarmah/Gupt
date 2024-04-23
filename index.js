import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { kutumbReqRoutes } from "./routes/kutumbReqRoutes.js";
import { sksRoutes } from "./routes/sksRoutes.js";
import { publicKeyGen } from "./utils/publicKeyGen.js";
import { authenticateToken } from "./controllers/authController.js";
import { dsRoutes } from "./routes/dsRoutes.js";
import cookieParser from "cookie-parser";
import { friendRoutes } from "./routes/friends.js";
const app = express();
dotenv.config();
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// User Routes
app.use("/", sksRoutes);
app.use("/kutumbReq", authenticateToken, kutumbReqRoutes);
app.use("/send", authenticateToken, dsRoutes);
app.use("/req", friendRoutes);
