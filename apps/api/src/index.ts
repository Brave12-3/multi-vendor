import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/error-handler";

dotenv.config();

const app = express();

// ======================
// GLOBAL MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// HEALTH CHECK (REQUIRED)
// ======================
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// ======================
// ERROR HANDLER (LAST)
// ======================
app.use(errorHandler);

// ======================
// SERVER START
// ======================
const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
