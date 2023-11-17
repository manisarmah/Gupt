import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { kutumbReqRoutes } from "./routes/kutumbReqRoutes.js";
import { sksRoutes } from "./routes/sksRoutes.js";
import { publicKeyGen } from "./utils/publicKeyGen.js";
import { dsRoutes } from "./routes/dsRoutes.js";
const app = express();
dotenv.config();

app.use(cors());
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
// app.use("/", sksRoutes);
app.use("/kutumbReq", kutumbReqRoutes);
app.use("/send", dsRoutes);
